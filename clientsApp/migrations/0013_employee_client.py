# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0012_employee_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='client',
            field=models.ForeignKey(blank=True, to='clientsApp.Client', null=True),
            preserve_default=True,
        ),
    ]
