# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0005_delivery_urgency'),
    ]

    operations = [
        migrations.CreateModel(
            name='DoubleTypes',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('multiplier', models.FloatField(blank=True)),
                ('client', models.ForeignKey(to='clientsApp.Client', blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
