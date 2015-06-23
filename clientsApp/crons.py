from django_cron import CronJobBase, Schedule
from django.utils import timezone

class RegularDeliveryCron(CronJobBase):
	RUN_EVERY_MINS = 1
	#RUN_AT_TIMES = ['19:09']

	schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
	code = 'regular_delviery_cronff'

	def do(self):
		print timezone.now()
		print "fsfsdf"