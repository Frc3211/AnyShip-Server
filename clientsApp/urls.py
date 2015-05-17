from django.conf.urls import url
from clientsApp import views

urlpatterns = [
    url(r'^Customers/$', views.CustomerList.as_view()),
	url(r'^Customers/(?P<pk>[0-9]+)$', views.CustomerDetail.as_view()),
	url(r'^Cities/$', views.CityList.as_view()),
	url(r'^Delivery/$', views.DeliveryList.as_view()),
	url(r'^newDelivery/$', views.DeliveryCreate.as_view()),
	url(r'^VehicleTypes/$', views.VehicleTypeList.as_view()),
	url(r'^Delivery/(?P<pk>[0-9]+)$', views.DeliveryDetail.as_view()),
	url(r'^DeliveryStatus/$', views.DeliveryStatusList.as_view()),
	url(r'^Status/$', views.StatusList.as_view()),
	url(r'^PriceList/$', views.PriceListList.as_view()),
	url(r'^PriceListUpdate/(?P<pk>[0-9]+)$', views.PriceListUpdate.as_view()),
	url(r'^PriceListEntry/$', views.PriceListEntryList.as_view()),
	url(r'^PriceListEntryUpdate/(?P<pk>[0-9]+)$', views.PriceListEntryUpdate.as_view()),
	url(r'^getPrice/(?P<pk>[0-9]+)/(?P<city1>[0-9]+)/(?P<city2>[0-9]+)/$', views.getPrice),
	url(r'^UrgencyList/$', views.UrgencyList.as_view()),
	url(r'^DoubleTypeList/$', views.DoubleTypeList.as_view()),
	url(r'^Employee/$', views.EmployeeList.as_view()),
	url(r'^Employee/(?P<pk>[0-9]+)$', views.EmployeeUpdate.as_view()),
	url(r'^Jobs/$', views.JobList.as_view()),
	#url(r'^ContactMan/(?P<pk>[0-9]+)$', views.ContactManList.as_view()),
	url(r'^ContactMan/$', views.ContactManList.as_view()),
	url(r'^ContactMan/(?P<pk>[0-9]+)$', views.ContactManUpdate.as_view()),
	url(r'^Banks/$', views.BankList.as_view())
] 