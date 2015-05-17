from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework import generics, status
from rest_framework.views import APIView
from clientsApp.models import *
from clientsApp.serializers import *
from rest_framework.response import Response
from clientsApp.permissions import *
from rest_auth.views import *
import json



def index(request):
	return render(request, "index.html")
	if not request.user.is_authenticated():
		return redirect("/login")
	
	context = {}
	try:
		context['name'] = AnyshipUser.objects.get(user = request.user).name
	except ObjectDoesNotExist:
		context['name'] = ''
	return render(request, "index.html", context)
	
def login(request):
	return render(request, "login.html")
	
def is_authenticated(request):
	if not request.user.is_authenticated():
		print 'Not'
		return HttpResponse(json.dumps({'state': 'unauthorized'}), content_type="application/json")
	print 'Yes'
	anyshipUser = AnyshipUser.objects.get(user=request.user)
	return HttpResponse(json.dumps({'state': 'authorized', 'user': {'name': anyshipUser.name }}), content_type="application/json")
	
def getPrice(request, pk, city1, city2):
	customer = Customer.objects.get(pk=pk)
	e = PriceListEntry.objects.filter(Q(list=customer.priceList), (Q(sourceCity=city1) & Q(dest1=city2)) | (Q(sourceCity=city2) & Q(dest1=city1)))
	if not e:
		return HttpResponseNotFound()
	entry = {}
	entry['price'] = e[0].price
	entry['multiForPackage'] = e[0].multiForPackage
	entry['multiForBox'] = e[0].multiForBox
	entry['waiting'] = e[0].waiting
	
	return HttpResponse(json.dumps([entry]))

class PriceListList(generics.ListCreateAPIView):
	serializer_class = PriceListSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None 
		return PriceList.objects.filter(client=client)

class PriceListUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = PriceListSerializer
	
	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
		
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return PriceList.objects.filter(client=client)
	
class UrgencyList(generics.ListCreateAPIView):
	serializer_class = UrgencySerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None 
		return Urgency.objects.filter(client=client)
		
class DoubleTypeList(generics.ListCreateAPIView):
	serializer_class = DoubleTypeSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None 
		return DoubleType.objects.filter(client=client)

class PriceListEntryList(generics.ListCreateAPIView):
	serializer_class = PriceListEntrySerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None 
		return PriceListEntry.objects.filter(client=client)
		
class PriceListEntryUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = PriceListEntrySerializer
	
	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None 
		return PriceListEntry.objects.filter(client=client)
		
class VehicleTypeList(generics.ListCreateAPIView):
	serializer_class = VehicleTypeSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
		
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return VehicleType.objects.filter(client=client)
	
class DeliveryList(generics.ListCreateAPIView):
	serializer_class = DeliverySerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Delivery.objects.filter(client=client)
		
class DeliveryCreate(generics.CreateAPIView):
	serializer_class = CreateDeliverySerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
class DeliveryStatusList(generics.ListCreateAPIView):
	serializer_class = DeliveryStatusSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return DeliveryStatus.objects.filter(client=client)
		
class ContactManList(generics.ListCreateAPIView):
	serializer_class = ContactManSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
		
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return ContactMan.objects.filter(client=client)
		
class ContactManUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = ContactManSerializer
	
	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return ContactMan.objects.filter(client=client)
	
class StatusList(generics.ListCreateAPIView):
	serializer_class = StatusSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Status.objects.filter(client=client)
	
class EmployeeList(generics.ListCreateAPIView):
	serializer_class = EmployeeSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Employee.objects.filter(client=client)
		
class EmployeeUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = EmployeeSerializer
	
	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
		
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Employee.objects.filter(client=client)
		
class JobList(generics.ListCreateAPIView):
	serializer_class = JobSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Job.objects.filter(client=client)
	
	
class DeliveryDetail(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = DeliverySerializer
	
	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Delivery.objects.filter(client=client)
		
class BankList(generics.ListCreateAPIView):
	serializer_class = BankSerializer
	queryset = Bank.objects.all()

class CustomerList(generics.ListCreateAPIView):
	serializer_class = CustomersSerializer
	
	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user 
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Customer.objects.filter(client=client)

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = CustomersSerializer
	
	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
	
	def get_queryset(self):
		user = self.request.user 
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Customer.objects.filter(client=client)
	
class CityList(generics.ListAPIView):
	queryset = City.objects.all()
	serializer_class = CitySerializer
