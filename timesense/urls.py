from django.urls import path

from timesense.views import record_list_view, record_detail_view, timer_view

app_name = "timesense"

urlpatterns = [
    path("", record_list_view, name="index"),
    path("timer", timer_view, name="timer"),
    path("<int:pk>", record_detail_view, name="detail"),
]
