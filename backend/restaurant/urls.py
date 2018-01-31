from django.conf.urls import url, include

from .apis import (
    MenuRetrieveAPI,
    ItemListAPI,
    MenuSectionRetrieveAPI,

    OrderCreateAPI,
    PayOrderAPI,
    VoidOrderAPI,
)


order_patterns = [
    url(
        regex=r'^create/',
        view=OrderCreateAPI.as_view(),
        name='create'
    ),
    url(
        regex=r'^(?P<order_id>[0-9]+)/pay/',
        view=PayOrderAPI.as_view(),
        name='pay'
    ),
    url(
        regex=r'^(?P<order_id>[0-9]+)/void/',
        view=VoidOrderAPI.as_view(),
        name='void'
    ),
]


urlpatterns = [
    url(
        regex=r'^menu/(?P<menu_id>[0-9]+)/$',
        view=MenuRetrieveAPI.as_view(),
        name='menu-retrieve'
    ),
    url(
        regex=r'^items/$',
        view=ItemListAPI.as_view(),
        name='item-list'
    ),
    url(
        regex=r'^menu-section/(?P<menu_section_id>[0-9]+)/$',
        view=MenuSectionRetrieveAPI.as_view(),
        name='menu-section-retrieve'
    ),
    url(
        regex=r'^order/',
        view=include(
            arg=order_patterns,
            namespace='order'
        )
    ),
]
