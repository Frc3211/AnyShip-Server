# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0008_auto_20150501_1655'),
    ]

    operations = [
        migrations.AddField(
            model_name='delivery',
            name='doubleType',
            field=models.ForeignKey(blank=True, to='clientsApp.DoubleType', null=True),
            preserve_default=True,
        ),
    ]
