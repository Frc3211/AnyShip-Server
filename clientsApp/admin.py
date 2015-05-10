from django.contrib import admin
from .models import *

admin.site.register(AnyshipUser)
admin.site.register(Delivery)
admin.site.register(Client)
admin.site.register(Customer)
admin.site.register(VehicleType)
admin.site.register(DeliveryStatus)
admin.site.register(Status)
admin.site.register(PriceList)
admin.site.register(PriceListEntry)
admin.site.register(Urgency)
admin.site.register(DoubleType)
admin.site.register(Employee)
admin.site.register(Job)