# Generated by Django 4.2.4 on 2023-12-18 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rides', '0004_alter_ride_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ride',
            name='time',
            field=models.TimeField(auto_now=True),
        ),
    ]
