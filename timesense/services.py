def convert_to_unit(time_ms, unit):
    return time_ms / unit.conversion_to_ms


def get_records(records):
    return [
        {
            "created_at": record.created_at,
            "target": convert_to_unit(record.target_ms, record.unit),
            "actual": convert_to_unit(record.actual_ms, record.unit),
            "unit": {
                "name": record.unit.name,
                "abbreviation": record.unit.abbreviation,
            },
        }
        for record in records
    ]


def get_records_by_date(records):
    records_by_date = {}
    for record in get_records(records):
        print(record)
        record_date = record["created_at"].date()
        if record_date not in records_by_date:
            records_by_date[record_date] = []
        records_by_date[record_date].append(record)
    return records_by_date
