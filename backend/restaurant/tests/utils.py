from factory.fuzzy import FuzzyInteger

from restaurant.factories import ItemFactory


class ItemsDataSetupMixin:
    def create_items_data(self, items_count=5, for_api=False):
        self.items_count = items_count
        self.items = ItemFactory.create_batch(self.items_count)

        self.items_data = [
            {'item': item, 'quantity': FuzzyInteger(low=1, high=10).fuzz()}
            for item in self.items
        ]

        if for_api:
            self.request_items_data = [
                {'item': item_data['item'].id, 'quantity': item_data['quantity']}
                for item_data in self.items_data
            ]
