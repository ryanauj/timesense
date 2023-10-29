from django.shortcuts import render

from timesense.models import TimeRecord, TimeUnit
from timesense.services import map_records_by_date, map_record, map_units


def record_list_view(request):
    all_records = TimeRecord.objects.select_related("unit").all()
    all_records_by_date = map_records_by_date(all_records)

    return render(
        request,
        "timesense/record_list.html",
        context={"records_by_date": all_records_by_date},
    )


def record_list_view(request):
    all_records = TimeRecord.objects.select_related("unit").all()
    all_records_by_date = map_records_by_date(all_records)

    return render(
        request,
        "timesense/record_list.html",
        context={"records_by_date": all_records_by_date},
    )


def record_detail_view(request, pk):
    record = TimeRecord.objects.select_related("unit").get(pk=pk)
    mapped_record = map_record(record)
    print(mapped_record)

    return render(
        request,
        "timesense/record_detail.html",
        context={"record": mapped_record},
    )


def timer_view(request):
    units = TimeUnit.objects.all()
    return render(
        request,
        "timesense/timer.html",
        context={"units": map_units(units)},
    )
