# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0015_auto_20150507_0729'),
    ]

    operations = [
        migrations.AddField(
            model_name='status',
            name='client',
            field=models.ForeignKey(blank=True, to='clientsApp.Client', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='vehicletype',
            name='client',
            field=models.ForeignKey(blank=True, to='clientsApp.Client', null=True),
            preserve_default=True,
        ),
    ]
