from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from .models import Menu, Item, Order, MenuSection
from .serializers import (
    MenuSerializer,
    ItemSerializer,
    OrderSerializer,
    MenuSectionSerializer,

    OrderCreateSerializer,
)
from .mixins import ServiceExceptionHandlerMixin
from .services import record_order, pay_order, void_order


class MenuRetrieveAPI(RetrieveAPIView):
    serializer_class = MenuSerializer
    lookup_url_kwarg = 'menu_id'
    queryset = Menu.objects.prefetch_related('menu_sections')


class ItemListAPI(ListAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.filter(is_active=True).select_related('menu_section', 'menu_section__menu')


class MenuSectionRetrieveAPI(RetrieveAPIView):
    serializer_class = MenuSectionSerializer
    lookup_url_kwarg = 'menu_section_id'
    queryset = MenuSection.objects.prefetch_related('items')


class OrderCreateAPI(ServiceExceptionHandlerMixin, APIView):
    def post(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        order = record_order(items=data['items'], table=data['table'])

        obj_serializer = OrderSerializer(order)
        result = obj_serializer.data

        return Response(result, status=status.HTTP_201_CREATED)


class PayOrderAPI(ServiceExceptionHandlerMixin, APIView):
    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=kwargs.get('order_id'))

        order = pay_order(order=order)

        obj_serializer = OrderSerializer(order)
        result = obj_serializer.data

        return Response(result, status=status.HTTP_200_OK)


class VoidOrderAPI(ServiceExceptionHandlerMixin, APIView):
    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, id=kwargs.get('order_id'))

        order = void_order(order=order)

        obj_serializer = OrderSerializer(order)
        result = obj_serializer.data

        return Response(result, status=status.HTTP_200_OK)
