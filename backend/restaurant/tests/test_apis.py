from unittest.mock import patch

from test_plus import TestCase
from rest_framework.test import APIClient

from restaurant.factories import TableFactory, OrderFactory

from .utils import ItemsDataSetupMixin


class OrderCreateAPITests(TestCase, ItemsDataSetupMixin):
    def setUp(self):
        self.client = APIClient()

        self.table = TableFactory()

        self.create_items_data(for_api=True)

        self.url = self.reverse('api:order:create')

    @patch('restaurant.apis.record_order')
    def test_api_calls_service(self, service_mock):
        service_mock.return_value = OrderFactory(items=self.items_data, table=self.table)

        data = {'items': self.request_items_data, 'table': self.table.id}
        response = self.client.post(self.url, data=data, format='json')

        self.response_201(response)

        service_mock.assert_called_once_with(
            items=self.items_data,
            table=self.table
        )


class VoidOrderAPITests(TestCase, ItemsDataSetupMixin):
    def setUp(self):
        self.client = APIClient()

        self.create_items_data(for_api=True)
        self.table = TableFactory()
        self.order = OrderFactory(items=self.items_data, table=self.table)

        self.url = self.reverse('api:order:void', order_id=self.order.id)

    @patch('restaurant.apis.void_order')
    def test_api_calls_service(self, service_mock):
        service_mock.return_value = self.order

        response = self.client.get(self.url)

        self.response_200(response)

        service_mock.assert_called_once_with(order=self.order)


class PayOrderAPITests(TestCase, ItemsDataSetupMixin):
    def setUp(self):
        self.client = APIClient()

        self.create_items_data(for_api=True)
        self.table = TableFactory()
        self.order = OrderFactory(items=self.items_data, table=self.table)

        self.url = self.reverse('api:order:pay', order_id=self.order.id)

    @patch('restaurant.apis.pay_order')
    def test_api_calls_service(self, service_mock):
        service_mock.return_value = self.order

        response = self.client.get(self.url)

        self.response_200(response)

        service_mock.assert_called_once_with(order=self.order)
