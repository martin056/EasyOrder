from rest_framework import serializers

from .models import Item, Table, Order


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id',
                  'name',
                  'description',
                  'price',
                  'is_active',
                  'image')


class MenuSectionSerializer(serializers.Serializer):
    title = serializers.CharField()
    items = ItemSerializer(many=True)


class MenuSerializer(serializers.Serializer):
    menu_sections = MenuSectionSerializer(many=True)


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'table', 'items', 'amount', 'status', )


class OrderCreateSerializer(serializers.Serializer):
    class ItemQuantitySerializer(serializers.Serializer):
        item = serializers.PrimaryKeyRelatedField(
            queryset=Item.objects.all(),
            required=True
        )
        quantity = serializers.IntegerField(min_value=1, required=True)

    table = serializers.PrimaryKeyRelatedField(
        queryset=Table.objects.all(),
        required=True
    )
    items = ItemQuantitySerializer(many=True, required=True)
