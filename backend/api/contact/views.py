from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageCreateView(APIView):
    permission_classes = [AllowAny]  # Allow unrestricted access

    def post(self, request, format=None):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Your message has been saved successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
