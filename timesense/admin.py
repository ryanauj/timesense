from django.contrib import admin

from timesense.models import TimeRecord, TimeUnit

admin.site.register(TimeUnit)
admin.site.register(TimeRecord)
