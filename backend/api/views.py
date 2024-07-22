from django.http import JsonResponse 

# Create your views here.

def home(request):
    return JsonResponse({'Info':'React & Django Commerce',"name":"Okaydexter"})