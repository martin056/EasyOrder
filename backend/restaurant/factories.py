import factory
from factory.fuzzy import FuzzyInteger, FuzzyDecimal
from faker import Factory

from .models import Table, Waiter, Item, MenuSection, Menu, Order
from .services import record_order


faker = Factory.create()


class WaiterFactory(factory.DjangoModelFactory):
    class Meta:
        model = Waiter

    name = factory.LazyAttribute(lambda _: faker.name())


class TableFactory(factory.DjangoModelFactory):
    class Meta:
        model = Table

    waiter = factory.SubFactory(WaiterFactory)
    capacity = factory.LazyAttribute(lambda _: FuzzyInteger(low=4, high=12).fuzz())


class MenuFactory(factory.DjangoModelFactory):
    class Meta:
        model = Menu


class MenuSectionFactory(factory.DjangoModelFactory):
    class Meta:
        model = MenuSection

    menu = factory.SubFactory(MenuFactory)
    title = factory.LazyAttribute(lambda _: faker.word())


class ItemFactory(factory.DjangoModelFactory):
    class Meta:
        model = Item

    menu_section = factory.SubFactory(MenuSectionFactory)
    name = factory.LazyAttribute(lambda _: faker.word())
    description = factory.LazyAttribute(lambda _: faker.text())
    price = factory.LazyAttribute(lambda _: FuzzyDecimal(low=1.00, high=100.00).fuzz())


class OrderFactory(factory.DjangoModelFactory):
    class Meta:
        model = Order

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        order = record_order(items=kwargs['items'], table=kwargs['table'])

        return order
