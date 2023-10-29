from django.db import models

from timesense.services import convert_to_unit


class TimeUnit(models.Model):
    name = models.CharField(max_length=100, unique=True)
    abbreviation = models.CharField(max_length=10)
    conversion_to_ms = models.IntegerField()

    def __str__(self):
        return f"{self.name}, {self.abbreviation}"


class TimeRecord(models.Model):
    unit = models.ForeignKey(
        TimeUnit, null=True, on_delete=models.SET_NULL, related_name="records"
    )
    start_epoch_ms = models.PositiveBigIntegerField()
    stop_epoch_ms = models.PositiveBigIntegerField()
    target_ms = models.IntegerField()
    actual_ms = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        converted_time = convert_to_unit(self.actual_ms, self.unit)
        return f"{converted_time} {self.unit.abbreviation}"
