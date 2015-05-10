# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0011_auto_20150503_1917'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='city',
            field=models.ForeignKey(blank=True, to='clientsApp.City', null=True),
            preserve_default=True,
        ),
    ]
