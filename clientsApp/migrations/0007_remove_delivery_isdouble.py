# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0006_doubletypes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='delivery',
            name='isDouble',
        ),
    ]
