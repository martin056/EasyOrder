from djmoney.models.fields import MoneyField

from django.db import models
from django.conf import settings
from django.utils import timezone


def _item_directory_path(instance, filename):
    now = timezone.now().isoformat()

    return f'items/item_{instance.name}_{now}_{filename}'


class Menu(models.Model):
    pass


class MenuSection(models.Model):
    title = models.CharField(max_length=255)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='menu_sections')

    def __str__(self):
        return self.title


class Item(models.Model):
    menu_section = models.ForeignKey(MenuSection, on_delete=models.CASCADE, related_name='items')

    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    price = MoneyField(max_digits=10,
                       decimal_places=2,
                       default_currency=settings.DEFAULT_CURRENCY)
    image = models.ImageField(upload_to=_item_directory_path, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    @property
    def order(self):
        return self.orderitem_set.first()


class Order(models.Model):
    PENDING = 'panding'
    VOIDED = 'voided'
    PAID = 'paid'

    STATUS_CHOICES = (
        (PENDING, 'pending'),
        (VOIDED, 'voided'),
        (PAID, 'paid'),
    )

    table = models.ForeignKey('Table', on_delete=models.CASCADE, related_name='orders')
    items = models.ManyToManyField(Item, through='OrderItem')

    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default=PENDING)

    def __str__(self):
        return f'Order for {self.table}'

    @property
    def amount(self):
        return sum(item.price * item.quantity for item in self.items.all())

    def void(self):
        self.status = self.VOIDED
        self.save()

    def pay(self):
        self.status = self.PAID
        self.save()


class OrderItem(models.Model):
    item = models.OneToOneField(Item)
    order = models.ForeignKey(Order)

    quantity = models.PositiveSmallIntegerField(default=1)


class Table(models.Model):
    waiter = models.ForeignKey('Waiter', on_delete=models.CASCADE, related_name='tables')
    capacity = models.PositiveSmallIntegerField()
    title = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        if self.title is not None:
            return f'Table {self.title}'

        return f'Table {self.id}'


class Waiter(models.Model):
    name = models.CharField(max_length=255)
