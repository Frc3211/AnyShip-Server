# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0016_auto_20150507_1119'),
    ]

    operations = [
        migrations.AddField(
            model_name='deliverystatus',
            name='client',
            field=models.ForeignKey(blank=True, to='clientsApp.Client', null=True),
            preserve_default=True,
        ),
    ]
