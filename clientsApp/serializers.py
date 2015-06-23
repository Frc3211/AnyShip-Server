from django.forms import widgets
from rest_framework import serializers
from clientsApp.models import *
from django.contrib.auth.models import User

class PriceListEntrySerializer(serializers.ModelSerializer):
	class Meta:
		model = PriceListEntry
		
class PriceListSerializer(serializers.ModelSerializer):
	entries = PriceListEntrySerializer(many=True, read_only=True)
	class Meta:
		model = PriceList
		#depth = 1
		fields = ('id', 'client', 'name', 'entries')
		
class EmployeeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Employee

class JobSerializer(serializers.ModelSerializer):
	class Meta:
		model = Job
		
class CreateDeliverySerializer(serializers.ModelSerializer):
	#cl = serializers.CharField(source='client', read_only=True)
	#client = ClientSerializer()
	#client = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	class Meta:
		model = Delivery
		
class DeliverySerializer(serializers.ModelSerializer):
	#destCity = serializers.SlugRelatedField(slug_field='name', queryset=City.objects.all())
	#created_time = serializers.DateTimeField(source='created', read_only=True, format="iso-8601")
	#created_date = serializers.DateTimeField(source='created', read_only=True, format="%d/%m/%y")
	
	class Meta:
		model = Delivery
		depth = 1
		
class DeliveryStatusSerializer(serializers.ModelSerializer):
	class Meta:
		model = DeliveryStatus
		
				
class ContactManSerializer(serializers.ModelSerializer):
	class Meta:
		model = ContactMan

class CustomersSerializer(serializers.ModelSerializer):
	contact_man = ContactManSerializer(many=True, read_only=True)
	class Meta:
		model = Customer
		#depth = 1

class MinCustomersSerializer(serializers.ModelSerializer):
	class Meta:
		model = Customer
		fields = ('id', 'name')
		
class UrgencySerializer(serializers.ModelSerializer):
	class Meta:
		model = Urgency
	
class DoubleTypeSerializer(serializers.ModelSerializer):
	class Meta:
		model = DoubleType
		
class CitySerializer(serializers.ModelSerializer):
	class Meta:
		model = City
		depth = 1
		#fields = ('name', 'areaCode')
		
class StatusSerializer(serializers.ModelSerializer):
	class Meta:
		model = Status
		#fields = ('name', )
		
class CustomerTypeSerializer(serializers.ModelSerializer):
	class Meta:
		model = CustomerType
		#fields = ('name', )
		
class TermSerializer(serializers.ModelSerializer):
	class Meta:
		model = Term
		#fiels = ('name', )
		
class BankSerializer(serializers.ModelSerializer):
	class Meta: 
		model = Bank
		#fields = ('name', 'num')

class VehicleTypeSerializer(serializers.ModelSerializer):
	class Meta:
		model = VehicleType


class RegularDeliverySerializer(serializers.ModelSerializer):
	class Meta:
		model = RegularDelivery	
		depth = 1

class CreateRegularDeliverySerializer(serializers.ModelSerializer):
	class Meta:
		model = RegularDelivery	

class RegularSiteSerializer(serializers.ModelSerializer):
	class Meta:
		model = RegularSite
