# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='urgency',
            name='client1',
            field=models.ForeignKey(blank=True, to='clientsApp.Client', null=True),
            preserve_default=True,
        ),
    ]
