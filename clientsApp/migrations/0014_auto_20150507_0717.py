# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0013_employee_client'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerconatctman',
            name='job',
            field=models.ForeignKey(to='clientsApp.Job'),
            preserve_default=True,
        ),
        migrations.DeleteModel(
            name='CustomerContactManJob',
        ),
    ]
