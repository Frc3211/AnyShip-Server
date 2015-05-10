# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clientsApp', '0014_auto_20150507_0717'),
    ]

    operations = [
        migrations.RenameField(
            model_name='job',
            old_name='jobName',
            new_name='name',
        ),
        migrations.AddField(
            model_name='job',
            name='client',
            field=models.ForeignKey(blank=True, to='clientsApp.Client', null=True),
            preserve_default=True,
        ),
    ]
