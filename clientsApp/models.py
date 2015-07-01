# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
# * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [app_label]'
# into your database.
from __future__ import unicode_literals

from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from django.contrib.auth.models import User
from pygments.lexers import get_lexer_by_name
from pygments.formatters.html import HtmlFormatter
from pygments import highlight

class Client(models.Model):
	name = models.CharField(max_length=30)

	def __unicode__(self):
		return self.name

class AnyshipUser(models.Model):
	client = models.ForeignKey('Client')
	user = models.OneToOneField(User)
	name = models.CharField(max_length=30)

	def __unicode__(self):
		return "%s - %s" % (self.name, self.client)

class Customer(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)
	created = models.DateTimeField(auto_now_add=True)

	name = models.CharField(max_length=50)
	streetName = models.CharField(max_length=40, null=True, blank=True)
	streetNum = models.IntegerField(null=True, blank=True)
	city = models.ForeignKey('City', blank=True, null=True)
	zipCode = models.IntegerField(blank=True, null=True)
	postBox = models.IntegerField(blank=True, null=True)
	pcNum = models.IntegerField(blank=True, null=True)

	phone1 = models.CharField(max_length=20, null=True, blank=True)
	phone2 = models.CharField(max_length=20, null=True, blank=True)
	fax = models.CharField(max_length=20, null=True, blank=True)
	email = models.EmailField(max_length=75, blank=True, null=True)
	physicalAddress = models.CharField(max_length=100, blank=True, null=True)

	status = models.ForeignKey('Status', blank=True, null=True)
	customerType = models.ForeignKey('CustomerType', blank=True, null=True)
	openingDate = models.DateField(blank=True, null=True)
	endDate = models.DateField(blank=True, null=True)

	priceList = models.ForeignKey('PriceList', null=True, blank=True)
	bank = models.ForeignKey('Bank', blank=True, null=True)
	branchNum = models.SmallIntegerField(blank=True, null=True)
	accountNum = models.IntegerField(blank=True, null=True)

	comment = models.CharField(max_length=300, blank=True, null=True)
	rakazMsg = models.CharField(max_length=300, blank=True, null=True)
	jumpMsg = models.CharField(max_length=300, null=True, blank=True)

	"""
	#arrive = models.IntegerField(blank=True, null=True)
	term = models.ForeignKey('Term', blank=True, null=True)
	discount = models.SmallIntegerField(blank=True, null=True)
	minPrice = models.IntegerField(blank=True, null=True)
	exportCode = models.IntegerField(blank=True, null=True)
	guarantee = models.IntegerField(blank=True, null=True)
	obligo = models.IntegerField(blank=True, null=True)
	#isContactPermission
	#paymentMethod
	fromPackageNum = models.PositiveSmallIntegerField(blank=True, null=True)
	fromWaiting = models.PositiveSmallIntegerField(blank=True, null=True)
	#timeToAfternoon
	#isTotalWaiting
	fromBoxNum = models.PositiveSmallIntegerField(blank=True, null=True)
	#employee
	#doubleAll
	#priceList
	#isSendSms
	#idNum
	#userId
	#companyID
	balance = models.FloatField(blank=True, null=True)
	#jumpingMsg
	#cusLevel
	#siteMsg
	paymentMethod = models.ForeignKey('PaymentMethod', blank=True, null=True)
	#GuaranteePercent
	#FromRampNum
	#IsThermo
	#SnifID
	"""

	def __unicode__(self):
		return self.name

	class Meta:
		ordering = ('name',)

class PaymentMethod(models.Model):
	name = models.CharField(max_length=20)

class City(models.Model):
	name = models.CharField(max_length=50)
	#areaCode = models.SmallIntegerField()

	def __unicode__(self):
		return self.name

class Status(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)
	name = models.CharField(max_length=50)

	def __unicode__(self):
		return self.name

class CustomerType(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)
	name = models.CharField(max_length=30)

class Term(models.Model):
	name = models.CharField(max_length=30)

class Bank(models.Model):
	name = models.CharField(max_length=30)
	num = models.SmallIntegerField()

class SalesMan(models.Model):
	client = models.ForeignKey('Client')
	name = models.CharField(max_length=50)

class Urgency(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)
	name = models.CharField(max_length=30)
	multiplier = models.FloatField(blank=True)

	def __unicode__(self):
		return self.name

class DoubleType(models.Model):
	client = models.ForeignKey('Client', blank=True, null=True)
	name = models.CharField(max_length=30)
	multiplier = models.FloatField(blank=True)

	def __unicode__(self):
		return self.name

class Delivery(models.Model):
	client = models.ForeignKey('Client', related_name='deliveries', null=True, blank=True)
	created = models.DateTimeField(auto_now=True, null=True, blank=True)
	#date = models.DateField(auto_now=True, null=True, blank=True)
	#deliveryNumber = models.IntegerField(unique=True, null=True, blank=True)
	customer = models.ForeignKey('Customer', null=True, blank=True)
	contactMan = models.ForeignKey('ContactMan', blank=True, null=True)
	type = models.PositiveSmallIntegerField(null=True, blank=True)

	#sender = models.ForeignKey('Customer', related_name='Customer3', null=True, blank=True)
	sender = models.CharField(max_length=50, null=True, blank=True)
	#receiver = models.ForeignKey('Customer', related_name='Customer2', null=True, blank=True)
	receiver = models.CharField(max_length=50, null=True, blank=True)
	sourceCity = models.ForeignKey('City', related_name='City2', null=True, blank=True)
	sourceStreet = models.CharField(max_length=50, null=True, blank=True)
	destCity = models.ForeignKey('City', related_name='City1', null=True, blank=True)
	destStreet = models.CharField(max_length=50, null=True, blank=True)
	sourcePhone = models.CharField(max_length=20, null=True, blank=True)
	destPhone = models.CharField(max_length=20, null=True, blank=True)
	sourceHomeNum = models.IntegerField(null=True, blank=True)
	destHomeNum = models.IntegerField(null=True, blank=True)
	sourceHomeEnter = models.IntegerField(null=True, blank=True)
	destHomeEnter = models.IntegerField(null=True, blank=True)
	sourceFloor = models.IntegerField(null=True, blank=True)
	destFloor = models.IntegerField(null=True, blank=True)
	sourceApart = models.IntegerField(null=True, blank=True)
	destApart = models.IntegerField(null=True, blank=True)

	comment = models.CharField(max_length=300, null=True, blank=True)
	instructions = models.CharField(max_length=300, null=True, blank=True)

	urgency = models.ForeignKey('Urgency', null=True, blank=True)
	doubleType = models.ForeignKey('DoubleType', blank=True, null=True)
	vehicleType = models.ForeignKey('VehicleType', null=True, blank=True)
	waiting = models.SmallIntegerField(null=True, blank=True)
	#status = models.ForeignKey('DeliveryStatus', null=True, blank=True)
	status = models.IntegerField(null=True, blank=True)
	barcode = models.CharField(max_length=15, null=True, blank=True)
	firstReceiverName = models.CharField(max_length=30, null=True, blank=True)
	secondReceiverName = models.CharField(max_length=30, null=True, blank=True)
	firstDeliver = models.ForeignKey('Employee', null=True, blank=True, related_name='delivery_first_deliver')
	secondDeliver = models.ForeignKey('Employee', null=True, blank=True, related_name='delivery_second_deliver')
	thirdDeliver = models.ForeignKey('Employee', null=True, blank=True, related_name='delivery_third_deliver')
	certNum = models.IntegerField(null=True, blank=True)
	rakazTime = models.DateTimeField(null=True, blank=True)
	exeTime = models.DateTimeField(null=True, blank=True)
	endTime = models.DateTimeField(null=True, blank=True)
	isTomorrow = models.BooleanField(default=False, blank=True)
	signCert = models.BooleanField(default=False, blank=True)
	numOfPackages = models.SmallIntegerField(null=True, blank=True)
	numOfBoxes = models.SmallIntegerField(null=True, blank=True)


	basicPrice = models.IntegerField(null=True, blank=True)
	totalPrice = models.IntegerField(null=True, blank=True)

	employee = models.ForeignKey('Employee', null=True, blank=True, related_name='delivery_employee')

	"""
	date = models.DateField(null=True, blank=True)
	time = models.TimeField(null=True, blank=True)
	isBoxToDirections = models.BooleanField(default=False, blank=True)
	#user = models.ForeignKey('User') :TODO
	#multipleSelect :TODO - check this field
	isTwoDirections = models.BooleanField(default=False, blank=True)
	isAfternoon = models.BooleanField(default=False, blank=True)
	destStreetNum = models.PositiveSmallIntegerField(null=True, blank=True)
	sourceStreetNum = models.PositiveSmallIntegerField(null=True, blank=True)
	transTime = models.DateTimeField(null=True, blank=True)
	totalPriceForEmp = models.PositiveSmallIntegerField(null=True, blank=True)
	totalPriceForDelEmp = models.PositiveSmallIntegerField(null=True, blank=True)
	#isManual
	empPercent = models.FloatField(null=True, blank=True)
	secEmpPercent = models.FloatField(null=True, blank=True)
	"""

"""
class CustomerConatctMan(models.Model):
	name = models.CharField(max_length=30)
	customer = models.ForeignKey('Customer', primary_key=False)
	job = models.ForeignKey('Job', primary_key=False)
	phone1 = models.CharField(max_length=20)
	phone2 = models.CharField(max_length=20)
	email = models.EmailField(max_length=75)
	comment = models.CharField(max_length=255)
	#webUser
	#webPass
"""

class RegularDelivery(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)

	created = models.DateTimeField(auto_now=True)
	customer = models.ForeignKey('Customer', null=True, blank=True)
	contactMan = models.ForeignKey('ContactMan', null=True, blank=True)
	type = models.IntegerField(null=True, blank=True)
	firstDeliver = models.ForeignKey('Employee', null=True, related_name='first_deliver')
	secondDeliver = models.ForeignKey('Employee', null=True, related_name='second_deliver')
	thirdDeliver = models.ForeignKey('Employee', null=True, related_name='third_deliver')
	lastUpdate = models.DateTimeField(null=True, blank=True)
	startDate = models.DateTimeField(null=True, blank=True)
	endDate = models.DateTimeField(null=True, blank=True)
	startTime = models.DateTimeField(null=True, blank=True)
	endTime = models.DateTimeField(null=True)

	sourceCustomer = models.ForeignKey('Customer', null=True, related_name='sourceCustomer')
	sourceStreet = models.CharField(max_length=40, null=True, blank=True)
	sourceHomeNum = models.IntegerField(null=True)
	sourceHomeEnter = models.IntegerField(null=True)
	sourceApart = models.IntegerField(null=True)
	destCustomer = models.ForeignKey('Customer', null=True, related_name='destCustomer')
	destStreet = models.CharField(max_length=40, null=True)
	destHomeNum = models.IntegerField(null=True)
	destHomeEnter = models.IntegerField(null=True)
	destApart = models.IntegerField(null=True)

	urgency = models.ForeignKey('Urgency', null=True)
	doubleType = models.ForeignKey('DoubleType', null=True)
	vehicleType = models.ForeignKey('VehicleType', null=True)

	numOfPackages = models.IntegerField(null=True)
	numOfBoxes = models.IntegerField(null=True)
	comment = models.CharField(max_length=300, null=True)

	basicPrice = models.IntegerField(null=True)
	totalPrice = models.IntegerField(null=True)
	firstDeliverPrice = models.IntegerField(null=True)
	secondDeliverPrice = models.IntegerField(null=True)

	isSunday = models.BooleanField(default=False, blank=True)
	isMonday = models.BooleanField(default=False, blank=True)
	isTuesday = models.BooleanField(default=False, blank=True)
	isWednesday = models.BooleanField(default=False, blank=True)
	isThursday = models.BooleanField(default=False, blank=True)
	isFriday = models.BooleanField(default=False, blank=True)
	isSaturday = models.BooleanField(default=False, blank=True)

	status = models.IntegerField(null=True, blank=True)


class Employee(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)

	name = models.CharField(max_length=50)
	idNum = models.IntegerField(null=True, blank=True)
	birthDate = models.DateField(null=True, blank=True)
	gender = models.BooleanField(default=True)
	address = models.CharField(max_length=50, null=True, blank=True)
	city = models.ForeignKey('City', null=True, blank=True)
	maritalStatus = models.SmallIntegerField(null=True, blank=True)

	email = models.EmailField(max_length=75, null=True, blank=True)
	phone1 = models.CharField(max_length=30, null=True, blank=True)
	phone2 = models.CharField(max_length=30, null=True, blank=True)

	licenseType = models.SmallIntegerField(null=True, blank=True)
	licenseExp = models.DateField(null=True, blank=True)
	licenseNum = models.CharField(max_length=12, null=True, blank=True)
	type = models.BooleanField(default=True)
	tax = models.SmallIntegerField(null=True, blank=True)
	bank = models.ForeignKey('Bank', null=True, blank=True)
	branchNum = models.SmallIntegerField(null=True, blank=True)
	accountNum = models.IntegerField(null=True, blank=True)


	status = models.ForeignKey('Status', null=True, blank=True)
	job = models.ForeignKey('Job', null=True, blank=True)
	startDate = models.DateField(null=True, blank=True)
	endDate = models.DateField(null=True, blank=True)

	comment = models.CharField(max_length=300, null=True, blank=True)

	def __unicode__(self):
		return self.name


"""
class ContactMan(models.Model):
	customer = models.ForeignKey('')
	name = models.CharField(max_length=50)
	phone1 = models.CharField(max_length=20, blank=True, null=True)
	phone2 = models.CharField(max_length=20, blank=True, null=True)
	phoneExt = models.SmallIntegerField(blank=True, null=True)
	#job =
	email = models.EmailField(max_length=75, blank=True, null=True)

	def __unicode__(self):
		return self.name
"""

class ContactMan(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)
	customer = models.ForeignKey('Customer', null=True, blank=True, related_name="contact_man")
	name = models.CharField(max_length=50, null=True, blank=True)
	phone1 = models.CharField(max_length=20, blank=True, null=True)
	phone2 = models.CharField(max_length=20, blank=True, null=True)
	phoneExt = models.SmallIntegerField(blank=True, null=True)
	job = models.ForeignKey('Job', blank=True, null=True)
	email = models.EmailField(max_length=75, blank=True, null=True)

	def __unicode__(self):
		return "%s - %s" % (self.name, self.customer)

class DeliveryStatus(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)
	name = models.CharField(max_length=30)

	def __unicode__(self):
		return self.name

class Job(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)
	name = models.CharField(max_length=30, blank=True)

	def __unicode__(self):
		return self.name

class PriceList(models.Model):
	client = models.ForeignKey('Client')
	name = models.CharField(max_length=30)

	def __unicode__(self):
		return self.name

class PriceListEntry(models.Model):
	client = models.ForeignKey('Client')
	list = models.ForeignKey('PriceList', related_name='entries')
	sourceCity = models.ForeignKey('City')
	dest1 = models.ForeignKey('City', related_name='dest1')
	dest2 = models.ForeignKey('City', related_name='dest2', blank=True, null=True)
	dest3 = models.ForeignKey('City', related_name='dest3', blank=True, null=True)
	exeTime = models.SmallIntegerField()
	price = models.SmallIntegerField()
	waiting = models.SmallIntegerField()
	#multi = models.SmallIntegerField()
	isMultiForPackage = models.BooleanField(default=False)
	numForPackages = models.FloatField(blank=True, null=True)
	isMultiForBox = models.BooleanField(default=False)
	numForBox = models.FloatField(blank=True, null=True)
	#addForPackage = models.FloatField(blank=True, null=True)
	#multiForPackage = models.FloatField(blank=True, null=True)
	#addForBox = models.FloatField(blank=True, null=True)
	#multiForBox = models.FloatField(blank=True, null=True)
	percentForGiver = models.SmallIntegerField(blank=True, null=True)
	percentForGetter = models.SmallIntegerField(blank=True, null=True)

class VehicleType(models.Model):
	client = models.ForeignKey('Client', null=True, blank=True)
	name = models.CharField(max_length=20, null=True, blank=True)
	price = models.IntegerField(blank=True, null=True)

	def __unicode__(self):
		return self.name

class RegularSite(models.Model):
	client = models.ForeignKey('Client', null=True)
	name = models.CharField(max_length=75, null=True)
	customer = models.ForeignKey('Customer', null=True)
	streetName = models.CharField(max_length=25, null=True)
	streetNum = models.IntegerField(null=True)
	city = models.ForeignKey('City', null=True)
	toll = models.IntegerField(null=True)
