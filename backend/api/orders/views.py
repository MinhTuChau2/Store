from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Order
from .serializers import OrderSerializer

class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]  # Allow unauthenticated access
