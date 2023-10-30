from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.decorators.http import require_GET

from timesense.forms import TimeRecordForm
from timesense.models import TimeUnit
from timesense.services import (
    map_records_by_date,
    map_record,
    map_units,
    get_all_user_records,
    get_user_record,
)


@login_required
@require_GET
def record_list_view(request):
    user_records = get_all_user_records(request.user)

    return render(
        request,
        "timesense/record_list.html",
        context={"records_by_date": map_records_by_date(user_records)},
    )


@login_required
@require_GET
def record_detail_view(request, pk):
    record = get_user_record(request.user, pk)

    return render(
        request,
        "timesense/record_detail.html",
        context={"record": map_record(record)},
    )


def timer_view(request):
    authenticated = request.user.is_authenticated
    previous = None

    if request.POST and authenticated:
        print(request.POST)
        form = TimeRecordForm(request.POST)
        if form.is_valid():
            record = form.save(commit=False)
            record.user = request.user
            record.save()
            redirect("timesense:timer")
        else:
            print(form.errors)

    units = TimeUnit.objects.all()
    return render(
        request,
        "timesense/timer.html",
        context={
            "authenticated": authenticated,
            "last_recorded": previous,
            "units": map_units(units),
        },
    )
