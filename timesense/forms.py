from django.forms import ModelForm

from timesense.models import TimeRecord


class TimeRecordForm(ModelForm):
    class Meta:
        model = TimeRecord
        fields = [
            "unit",
            "start_epoch_ms",
            "stop_epoch_ms",
            "target_ms",
            "actual_ms",
            "timezone_offset",
        ]
