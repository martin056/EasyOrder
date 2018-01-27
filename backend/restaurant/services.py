from typing import List, Dict

from django.db import transaction
from django.core.exceptions import ValidationError

from .models import Item, Order, OrderItem, Table


@transaction.atomic
def record_order(*, items: List[Dict[Item, int]], table: Table) -> Order:
    order = Order.objects.create(table=table)

    for item_data in items:
        OrderItem.objects.create(
            order=order,
            item=item_data['item'],
            quantity=item_data['quantity']
        )

    return order


def pay_order(*, order: Order) -> Order:
    if order.status == Order.VOIDED:
        raise ValidationError('Cannot pay already voided offer.', code='invalid')

    if order.status == Order.PAID:
        raise ValidationError('Cannot pay already paid offer.', code='invalid')

    order.pay()

    return order


def void_order(*, order: Order) -> Order:
    if order.status == Order.VOIDED:
        raise ValidationError('Cannot void already voided offer.', code='invalid')

    if order.status == Order.PAID:
        raise ValidationError('Cannot void already paid offer.', code='invalid')

    order.void()

    return order
