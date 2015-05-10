# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0002_urgency_client1'),
    ]

    operations = [
        migrations.RenameField(
            model_name='urgency',
            old_name='client1',
            new_name='client',
        ),
    ]
