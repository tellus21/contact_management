from django.contrib import admin
from .models import Department, Authority, Profile, Company, Course, Option, Contact
# Register your models here.

admin.site.register(Department)
admin.site.register(Authority)
admin.site.register(Profile)
admin.site.register(Company)
admin.site.register(Course)
admin.site.register(Option)
admin.site.register(Contact)