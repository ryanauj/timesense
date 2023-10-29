from django.shortcuts import render
from django.views.generic import ListView

from timesense.models import TimeRecord
from timesense.services import convert_to_unit, get_records, get_records_by_date


class RecordListView(ListView):
    model = TimeRecord
    context_object_name = "record_list"
    template_name = "timesense/record_list.html"


def record_list_view(request):
    all_records = TimeRecord.objects.select_related("unit").all()
    all_records_by_date = get_records_by_date(all_records)

    return render(
        request,
        "timesense/record_list.html",
        context={"records_by_date": all_records_by_date},
    )
