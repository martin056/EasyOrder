from django.test import TestCase
from django.core.exceptions import ValidationError

from restaurant.factories import TableFactory, OrderFactory
from restaurant.services import record_order, pay_order, void_order
from restaurant.models import OrderItem, Order

from .utils import ItemsDataSetupMixin


class RecordOrderTests(TestCase, ItemsDataSetupMixin):
    def setUp(self):
        self.service = record_order
        self.create_items_data()

        self.table = TableFactory()

    def test_service_creates_all_models_properly(self):
        # items_data is {Item model: quantity}
        order = self.service(items=self.items_data, table=self.table)

        with self.subTest('Assertions for the newly created order'):
            self.assertIsNotNone(order)
            self.assertEqual(order.table, self.table)
            self.assertEqual(order.items.count(), self.items_count)

        with self.subTest('Assertions for OderItems'):
            for item_data in self.items_data:
                self.assertTrue(OrderItem.objects.filter(
                    order=order,
                    item=item_data['item'],
                    quantity=item_data['quantity']
                ).exists())


class PayOrderTests(TestCase, ItemsDataSetupMixin):
    def setUp(self):
        self.service = pay_order
        self.create_items_data()

        self.table = TableFactory()
        self.order = OrderFactory(items=self.items_data, table=self.table)

    def test_service_raises_validation_error_if_order_is_voided(self):
        self.order.void()

        with self.assertRaises(ValidationError):
            self.service(order=self.order)

    def test_service_raises_validation_error_if_order_is_paid_already(self):
        self.order.pay()

        with self.assertRaises(ValidationError):
            self.service(order=self.order)

    def test_service_pays_order(self):
        self.service(order=self.order)

        self.order.refresh_from_db()

        self.assertEqual(self.order.status, Order.PAID)


class VoidOrderTests(TestCase, ItemsDataSetupMixin):
    def setUp(self):
        self.service = void_order
        self.create_items_data()

        self.table = TableFactory()
        self.order = OrderFactory(items=self.items_data, table=self.table)

    def test_service_raises_validation_error_if_order_is_voided_already(self):
        self.order.void()

        with self.assertRaises(ValidationError):
            self.service(order=self.order)

    def test_service_raises_validation_error_if_order_is_paid(self):
        self.order.pay()

        with self.assertRaises(ValidationError):
            self.service(order=self.order)

    def test_service_voids_order(self):
        self.service(order=self.order)

        self.order.refresh_from_db()

        self.assertEqual(self.order.status, Order.VOIDED)
