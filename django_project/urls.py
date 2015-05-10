from django.conf.urls import patterns, include, url
from clientsApp import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
	(r'^$', views.index),
    (r'^admin/', include(admin.site.urls)),
	(r'^login/', views.login),
	(r'^is-authenticated/', views.is_authenticated),
	(r'^api/', include('clientsApp.urls')),
	(r'^rest-auth/', include('rest_auth.urls')),
	#(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
	(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
	(r'^accounts/', include('allauth.urls'))
)
