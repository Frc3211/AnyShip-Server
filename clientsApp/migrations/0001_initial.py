# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AnyshipUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Bank',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('num', models.SmallIntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('streetName', models.CharField(max_length=40, null=True, blank=True)),
                ('streetNum', models.IntegerField(null=True, blank=True)),
                ('phone1', models.CharField(max_length=20, null=True, blank=True)),
                ('phone2', models.CharField(max_length=20, null=True, blank=True)),
                ('fax', models.CharField(max_length=20, null=True, blank=True)),
                ('postBox', models.IntegerField(null=True, blank=True)),
                ('zipCode', models.IntegerField(null=True, blank=True)),
                ('openingDate', models.DateField(null=True, blank=True)),
                ('email', models.EmailField(max_length=75, null=True, blank=True)),
                ('discount', models.SmallIntegerField(null=True, blank=True)),
                ('pcNum', models.IntegerField(null=True, blank=True)),
                ('minPrice', models.IntegerField(null=True, blank=True)),
                ('exportCode', models.IntegerField(null=True, blank=True)),
                ('comments', models.CharField(max_length=500, null=True, blank=True)),
                ('branchNum', models.SmallIntegerField(null=True, blank=True)),
                ('accountNum', models.SmallIntegerField(null=True, blank=True)),
                ('guarantee', models.IntegerField(null=True, blank=True)),
                ('obligo', models.IntegerField(null=True, blank=True)),
                ('fromPackageNum', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('fromWaiting', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('endDate', models.DateField(null=True, blank=True)),
                ('fromBoxNum', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('physicalAddress', models.CharField(max_length=100, null=True, blank=True)),
                ('balance', models.FloatField(null=True, blank=True)),
                ('bank', models.ForeignKey(blank=True, to='clientsApp.Bank', null=True)),
                ('city', models.ForeignKey(blank=True, to='clientsApp.City', null=True)),
                ('client', models.ForeignKey(to='clientsApp.Client')),
            ],
            options={
                'ordering': ('name',),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CustomerConatctMan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('phone1', models.CharField(max_length=20)),
                ('phone2', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=75)),
                ('comment', models.CharField(max_length=255)),
                ('customer', models.ForeignKey(to='clientsApp.Customer')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CustomerContactManJob',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CustomersStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CustomerType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now=True)),
                ('urgency', models.IntegerField(null=True, blank=True)),
                ('destStreet', models.CharField(max_length=50, null=True, blank=True)),
                ('sourceStreet', models.CharField(max_length=50, null=True, blank=True)),
                ('date', models.DateField(null=True, blank=True)),
                ('time', models.TimeField(null=True, blank=True)),
                ('exeTime', models.TimeField(null=True, blank=True)),
                ('waiting', models.SmallIntegerField(null=True, blank=True)),
                ('numOfPackages', models.SmallIntegerField(null=True, blank=True)),
                ('numOfBoxes', models.SmallIntegerField(null=True, blank=True)),
                ('isBoxToDirections', models.BooleanField(default=False)),
                ('isTwoDirections', models.BooleanField(default=False)),
                ('isAfternoon', models.BooleanField(default=False)),
                ('isDouble', models.SmallIntegerField(null=True, blank=True)),
                ('destStreetNum', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('sourceStreetNum', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('transTime', models.DateTimeField(null=True, blank=True)),
                ('basicPrice', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('totalPrice', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('totalPriceForEmp', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('totalPriceForDelEmp', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('type', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('comment', models.CharField(max_length=300, null=True, blank=True)),
                ('firstReceiverName', models.CharField(max_length=30, null=True, blank=True)),
                ('secondReceiverName', models.CharField(max_length=30, null=True, blank=True)),
                ('empPercent', models.FloatField(null=True, blank=True)),
                ('secEmpPercent', models.FloatField(null=True, blank=True)),
                ('client', models.ForeignKey(related_name='deliveries', to='clientsApp.Client')),
                ('contactMan', models.ForeignKey(blank=True, to='clientsApp.CustomerConatctMan', null=True)),
                ('customer', models.ForeignKey(blank=True, to='clientsApp.Customer', null=True)),
                ('destCity', models.ForeignKey(related_name='City1', blank=True, to='clientsApp.City', null=True)),
                ('employee', models.ForeignKey(related_name='employee', blank=True, to='clientsApp.AnyshipUser', null=True)),
                ('firstDeliver', models.ForeignKey(related_name='first_deliver', blank=True, to='clientsApp.AnyshipUser', null=True)),
                ('receiver', models.ForeignKey(related_name='Customer2', blank=True, to='clientsApp.Customer', null=True)),
                ('secondDeliver', models.ForeignKey(related_name='second_deliver', blank=True, to='clientsApp.AnyshipUser', null=True)),
                ('sender', models.ForeignKey(related_name='Customer3', blank=True, to='clientsApp.Customer', null=True)),
                ('sourceCity', models.ForeignKey(related_name='City2', blank=True, to='clientsApp.City', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='DeliveryStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='EmpJob',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('jobName', models.CharField(max_length=30, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PaymentMethod',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PriceList',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('client', models.ForeignKey(to='clientsApp.Client')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PriceListEntry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('exeTime', models.SmallIntegerField()),
                ('price', models.SmallIntegerField()),
                ('waiting', models.SmallIntegerField()),
                ('addForPackage', models.SmallIntegerField(null=True, blank=True)),
                ('multiForPackage', models.SmallIntegerField(null=True, blank=True)),
                ('addForBox', models.SmallIntegerField(null=True, blank=True)),
                ('multiForBox', models.SmallIntegerField(null=True, blank=True)),
                ('percentForGiver', models.SmallIntegerField(null=True, blank=True)),
                ('percentForGetter', models.SmallIntegerField(null=True, blank=True)),
                ('client', models.ForeignKey(to='clientsApp.Client')),
                ('dest1', models.ForeignKey(related_name='dest1', to='clientsApp.City')),
                ('dest2', models.ForeignKey(related_name='dest2', blank=True, to='clientsApp.City', null=True)),
                ('dest3', models.ForeignKey(related_name='dest3', blank=True, to='clientsApp.City', null=True)),
                ('list', models.ForeignKey(related_name='entries', to='clientsApp.PriceList')),
                ('sourceCity', models.ForeignKey(to='clientsApp.City')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SalesMan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('client', models.ForeignKey(to='clientsApp.Client')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Term',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Urgency',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('multiplier', models.FloatField(blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='VehicleType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20, null=True, blank=True)),
                ('price', models.IntegerField(null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='delivery',
            name='status',
            field=models.ForeignKey(blank=True, to='clientsApp.DeliveryStatus', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='thirdDeliver',
            field=models.ForeignKey(related_name='third_deliver', blank=True, to='clientsApp.AnyshipUser', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='vehicleType',
            field=models.ForeignKey(blank=True, to='clientsApp.VehicleType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='customerconatctman',
            name='job',
            field=models.ForeignKey(to='clientsApp.CustomerContactManJob'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='customer',
            name='customerType',
            field=models.ForeignKey(blank=True, to='clientsApp.CustomerType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='customer',
            name='paymentMethod',
            field=models.ForeignKey(blank=True, to='clientsApp.PaymentMethod', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='customer',
            name='priceList',
            field=models.ForeignKey(blank=True, to='clientsApp.PriceList', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='customer',
            name='status',
            field=models.ForeignKey(blank=True, to='clientsApp.CustomersStatus', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='customer',
            name='term',
            field=models.ForeignKey(blank=True, to='clientsApp.Term', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='anyshipuser',
            name='client',
            field=models.ForeignKey(to='clientsApp.Client'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='anyshipuser',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
            preserve_default=True,
        ),
    ]
