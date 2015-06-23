from django_cron import CronJobBase, Schedule
from django.utils import timezone
from .models import *

class RegularDeliveryCron(CronJobBase):
	RUN_EVERY_MINS = 1
	#RUN_AT_TIMES = ['16:50']

	schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
	code = 'ddsadfs'

	def do(self):
		print "reset regular deliveries"
		for regular_delivery in RegularDelivery.objects.all():
			regular_delivery.firstDeliver = None
			regular_delivery.secondDeliver = None
			regular_delivery.thirdDeliver = None
			regular_delivery.status = 6

			regular_delivery.save()