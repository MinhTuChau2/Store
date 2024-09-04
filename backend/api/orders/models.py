# api/orders/models.py
from django.db import models

class Order(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    order_date = models.DateTimeField(auto_now_add=True)
    is_complete = models.BooleanField(default=False)
    products = models.TextField()  # Changed from ManyToManyField to TextField

    def __str__(self):
        return f"Order {self.id} - {self.name}"
