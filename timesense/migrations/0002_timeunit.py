# Generated by Django 4.2.5 on 2023-10-28 20:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timesense', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeUnit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
    ]
