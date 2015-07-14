from django_cron import CronJobBase, Schedule
from django.utils import timezone
from .models import *

class RegularDeliveryCron(CronJobBase):
	#RUN_EVERY_MINS = 1
	RUN_AT_TIMES = ['00:00']

	schedule = Schedule(run_at_times=RUN_AT_TIMES)
	code = 'regular_delivery_reset'

	def do(self):
		print "reset regular deliveries"
		for regular_delivery in RegularDelivery.objects.all():
			regular_delivery.firstDeliver = None
			regular_delivery.secondDeliver = None
			regular_delivery.thirdDeliver = None
			regular_delivery.status = 0

			regular_delivery.save()
