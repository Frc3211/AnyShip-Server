# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0010_auto_20150503_1857'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='accountNum',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='bank',
            field=models.ForeignKey(blank=True, to='clientsApp.Bank', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='birthDate',
            field=models.DateField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='branchNum',
            field=models.SmallIntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='comment',
            field=models.CharField(max_length=300, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='email',
            field=models.EmailField(max_length=75, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='endDate',
            field=models.DateField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='gender',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='licenseExp',
            field=models.DateField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='licenseNum',
            field=models.CharField(max_length=12, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='licenseType',
            field=models.SmallIntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='maritalStatus',
            field=models.SmallIntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='phone1',
            field=models.CharField(max_length=30, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='phone2',
            field=models.CharField(max_length=30, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='startDate',
            field=models.DateField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='tax',
            field=models.SmallIntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='employee',
            name='type',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
    ]
