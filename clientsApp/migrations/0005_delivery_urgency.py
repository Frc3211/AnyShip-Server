# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0004_remove_delivery_urgency'),
    ]

    operations = [
        migrations.AddField(
            model_name='delivery',
            name='urgency',
            field=models.ForeignKey(blank=True, to='clientsApp.Urgency', null=True),
            preserve_default=True,
        ),
    ]
