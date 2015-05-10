# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0009_delivery_doubletype'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='EmpJob',
            new_name='Job',
        ),
        migrations.RenameModel(
            old_name='CustomersStatus',
            new_name='Status',
        ),
        migrations.AddField(
            model_name='employee',
            name='address',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='idNum',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='job',
            field=models.ForeignKey(blank=True, to='clientsApp.Job', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='status',
            field=models.ForeignKey(blank=True, to='clientsApp.Status', null=True),
            preserve_default=True,
        ),
    ]
