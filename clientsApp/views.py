from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from itertools import chain
from rest_framework.decorators import api_view
from rest_framework import generics, status
from rest_framework.views import APIView
from clientsApp.models import *
from clientsApp.serializers import *
from rest_framework.response import Response
from clientsApp.permissions import *
from rest_auth.views import *
import json
from django.core import serializers


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
		print "not e"
		return HttpResponseNotFound()
	entry = {}
	entry['price'] = e[0].price
	entry['numForPackage'] = e[0].numForPackage
	entry['isMultiForPackage'] = e[0].isMultiForPackage
	entry['isMultiForBox'] = e[0].isMultiForBox
	entry['numForBox'] = e[0].numForBox
	entry['waiting'] = e[0].waiting
	entry['exeTime'] = e[0].exeTime

	return HttpResponse(json.dumps(entry), content_type="application/json")


def getLastDeliveries(request):
	user = request.user
	try:
		client = Client.objects.get(anyshipuser=user.anyshipuser)
	except:
		return None

	deliveries = Delivery.objects.filter(client=client).filter(status=6)
	regularDeliveries = RegularDelivery.objects.filter(client=client)
	results = list(deliveries) + list(regularDeliveries)
	results = serializers.serialize("json", results)
	return HttpResponse(results)

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

class UrgencyListUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = UrgencySerializer

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

class DoubleTypeListUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = DoubleTypeSerializer

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

class VehicleTypeListUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = VehicleTypeSerializer

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
		return VehicleType.objects.filter(client=client)

class DeliveryList(generics.ListCreateAPIView):
	#serializer_class = DeliverySerializer
	def get(self, request, *args, **kwargs):
		self.serializer_class = DeliverySerializer
		return generics.ListCreateAPIView.get(self, request, *args, **kwargs)

	def post(self, request, *args, **kwargs):
		self.serializer_class = CreateDeliverySerializer
		return generics.ListCreateAPIView.post(self, request, *args, **kwargs)

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

class LastDeliveryList(generics.ListAPIView):
	serializer_class = DeliverySerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Delivery.objects.filter(client=client).exclude(status=6)
"""
class DeliveryCreate(generics.CreateAPIView):
	serializer_class = CreateDeliverySerializer

	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)

	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)
"""

class DeliveryUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = CreateDeliverySerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return Delivery.objects.filter(client=client)

	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)

class RegularDeliveryList(generics.ListCreateAPIView):
	serializer_class = RegularDeliverySerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return RegularDelivery.objects.filter(client=client)

	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)

class LastRegularDeliveries(generics.ListAPIView):
	serializer_class = RegularDeliverySerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return RegularDelivery.objects.filter(client=client).exclude(status=6)

class RegularDeliveryCreate(generics.ListCreateAPIView):
	serializer_class = CreateRegularDeliverySerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return RegularDelivery.objects.filter(client=client)

	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)

class RegularDeliveryUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = CreateRegularDeliverySerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return RegularDelivery.objects.filter(client=client)

	def perform_update(self, serializer):
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

class StatusUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = StatusSerializer

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

class JobListUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = JobSerializer

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

class MinCustomerList(generics.ListAPIView):
	serializer_class = MinCustomersSerializer

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

class CustomerTypeList(generics.ListCreateAPIView):
	serializer_class = CustomerTypeSerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return CustomerType.objects.filter(client=client)

	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)

class RegularSiteList(generics.ListCreateAPIView):
	serializer_class = RegularSiteSerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return RegularSite.objects.filter(client=client)

	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)

class RegularSiteUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = RegularSiteSerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return RegularSite.objects.filter(client=client)

	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)

class RegularSitesForCustomer(generics.ListAPIView):
	serializer_class = RegularSiteSerializer

	def get_queryset(self):
		customer = self.kwargs['customer']
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return RegularSite.objects.filter(client=client).filter(customer=customer)

class VehicleCalanderList(generics.ListCreateAPIView):
	serializer_class = VehicleCalanderSerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return VehicleCalander.objects.filter(client=client)

	def perform_create(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)

class VehicleCalanderUpdate(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = VehicleCalanderSerializer

	def get_queryset(self):
		user = self.request.user
		try:
			client = Client.objects.get(anyshipuser=user.anyshipuser)
		except:
			return None
		return VehicleCalander.objects.filter(client=client)

	def perform_update(self, serializer):
		user = self.request.user
		client = Client.objects.get(anyshipuser=user.anyshipuser)
		serializer.save(client=client)