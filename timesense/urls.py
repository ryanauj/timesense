from django.urls import path

from timesense.views import RecordListView, record_list_view

urlpatterns = [path("", record_list_view, name="record_list")]
