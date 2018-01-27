from django.contrib import admin

from .models import Menu, Item, Order, Table, Waiter, MenuSection


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    pass


@admin.register(MenuSection)
class MenuSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'menu', )


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'menu_section', 'is_active', )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('table', 'get_items', 'amount', )

    def get_items(self, obj):
        return ', '.join(str(item) for item in obj.items.all())


@admin.register(Table)
class TableAdmin(admin.ModelAdmin):
    list_display = ('waiter', 'capacity', )


@admin.register(Waiter)
class WaiterAdmin(admin.ModelAdmin):
    list_display = ('name', )
