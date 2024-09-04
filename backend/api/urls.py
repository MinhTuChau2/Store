
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from .views import home

urlpatterns = [
    path('', home),
    path('product/',include('api.product.urls')),
    path('orders/',include('api.orders.urls')),
]

