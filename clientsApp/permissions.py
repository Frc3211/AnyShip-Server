from rest_framework import permissions

class IsCanLook(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		print 'check obj permissions'
		if request.method in permissions.SAFE_METHODS:
			return True
		
		print "obj", obj
		return obj.client == request.GET['client']
		return obj.owner == request.user
		
	def has_permission(self, request, view): 
		return True
		
class Block(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		return False
	
	def has_permission(self, request, view):
		return False