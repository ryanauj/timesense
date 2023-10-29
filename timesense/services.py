def convert_to_unit(time_ms, unit):
    return time_ms / unit.conversion_to_ms


def map_record(record):
    return {
        "pk": record.pk,
        "created_at": record.created_at,
        "target": convert_to_unit(record.target_ms, record.unit),
        "actual": convert_to_unit(record.actual_ms, record.unit),
        "unit": {
            "name": record.unit.name,
            "abbreviation": record.unit.abbreviation,
        },
    }


def map_records(records):
    return [map_record(record) for record in records]


def map_records_by_date(records):
    records_by_date = {}
    for record in map_records(records):
        print(record)
        record_date = record["created_at"].date()
        if record_date not in records_by_date:
            records_by_date[record_date] = []
        records_by_date[record_date].append(record)
    return records_by_date
