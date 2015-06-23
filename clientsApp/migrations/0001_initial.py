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
            name='ContactMan',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50, null=True, blank=True)),
                ('phone1', models.CharField(max_length=20, null=True, blank=True)),
                ('phone2', models.CharField(max_length=20, null=True, blank=True)),
                ('phoneExt', models.SmallIntegerField(null=True, blank=True)),
                ('email', models.EmailField(max_length=75, null=True, blank=True)),
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=50)),
                ('streetName', models.CharField(max_length=40, null=True, blank=True)),
                ('streetNum', models.IntegerField(null=True, blank=True)),
                ('zipCode', models.IntegerField(null=True, blank=True)),
                ('postBox', models.IntegerField(null=True, blank=True)),
                ('pcNum', models.IntegerField(null=True, blank=True)),
                ('phone1', models.CharField(max_length=20, null=True, blank=True)),
                ('phone2', models.CharField(max_length=20, null=True, blank=True)),
                ('fax', models.CharField(max_length=20, null=True, blank=True)),
                ('email', models.EmailField(max_length=75, null=True, blank=True)),
                ('physicalAddress', models.CharField(max_length=100, null=True, blank=True)),
                ('openingDate', models.DateField(null=True, blank=True)),
                ('endDate', models.DateField(null=True, blank=True)),
                ('branchNum', models.SmallIntegerField(null=True, blank=True)),
                ('accountNum', models.IntegerField(null=True, blank=True)),
                ('comment', models.CharField(max_length=300, null=True, blank=True)),
                ('rakazMsg', models.CharField(max_length=300, null=True, blank=True)),
                ('jumpMsg', models.CharField(max_length=300, null=True, blank=True)),
                ('bank', models.ForeignKey(blank=True, to='clientsApp.Bank', null=True)),
                ('city', models.ForeignKey(blank=True, to='clientsApp.City', null=True)),
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
            ],
            options={
                'ordering': ('name',),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CustomerType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now=True, null=True)),
                ('type', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('sourceStreet', models.CharField(max_length=50, null=True, blank=True)),
                ('destStreet', models.CharField(max_length=50, null=True, blank=True)),
                ('sourcePhone', models.CharField(max_length=20, null=True, blank=True)),
                ('destPhone', models.CharField(max_length=20, null=True, blank=True)),
                ('sourceHomeNum', models.IntegerField(null=True, blank=True)),
                ('destHomeNum', models.IntegerField(null=True, blank=True)),
                ('sourceHomeEnter', models.IntegerField(null=True, blank=True)),
                ('destHomeEnter', models.IntegerField(null=True, blank=True)),
                ('sourceFloor', models.IntegerField(null=True, blank=True)),
                ('destFloor', models.IntegerField(null=True, blank=True)),
                ('sourceApart', models.IntegerField(null=True, blank=True)),
                ('destApart', models.IntegerField(null=True, blank=True)),
                ('comment', models.CharField(max_length=300, null=True, blank=True)),
                ('instructions', models.CharField(max_length=300, null=True, blank=True)),
                ('waiting', models.SmallIntegerField(null=True, blank=True)),
                ('status', models.IntegerField(null=True, blank=True)),
                ('barcode', models.CharField(max_length=15, null=True, blank=True)),
                ('firstReceiverName', models.CharField(max_length=30, null=True, blank=True)),
                ('secondReceiverName', models.CharField(max_length=30, null=True, blank=True)),
                ('certNum', models.IntegerField(null=True, blank=True)),
                ('rakazTime', models.DateTimeField(null=True, blank=True)),
                ('exeTime', models.DateTimeField(null=True, blank=True)),
                ('endTime', models.DateTimeField(null=True, blank=True)),
                ('isTomorrow', models.BooleanField(default=False)),
                ('signCert', models.BooleanField(default=False)),
                ('numOfPackages', models.SmallIntegerField(null=True, blank=True)),
                ('numOfBoxes', models.SmallIntegerField(null=True, blank=True)),
                ('basicPrice', models.IntegerField(null=True, blank=True)),
                ('totalPrice', models.IntegerField(null=True, blank=True)),
                ('client', models.ForeignKey(related_name='deliveries', blank=True, to='clientsApp.Client', null=True)),
                ('contactMan', models.ForeignKey(blank=True, to='clientsApp.ContactMan', null=True)),
                ('customer', models.ForeignKey(blank=True, to='clientsApp.Customer', null=True)),
                ('destCity', models.ForeignKey(related_name='City1', blank=True, to='clientsApp.City', null=True)),
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
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='DoubleType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('multiplier', models.FloatField(blank=True)),
                ('client', models.ForeignKey(to='clientsApp.Client', blank=True)),
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
                ('idNum', models.IntegerField(null=True, blank=True)),
                ('birthDate', models.DateField(null=True, blank=True)),
                ('gender', models.BooleanField(default=True)),
                ('address', models.CharField(max_length=50, null=True, blank=True)),
                ('maritalStatus', models.SmallIntegerField(null=True, blank=True)),
                ('email', models.EmailField(max_length=75, null=True, blank=True)),
                ('phone1', models.CharField(max_length=30, null=True, blank=True)),
                ('phone2', models.CharField(max_length=30, null=True, blank=True)),
                ('licenseType', models.SmallIntegerField(null=True, blank=True)),
                ('licenseExp', models.DateField(null=True, blank=True)),
                ('licenseNum', models.CharField(max_length=12, null=True, blank=True)),
                ('type', models.BooleanField(default=True)),
                ('tax', models.SmallIntegerField(null=True, blank=True)),
                ('branchNum', models.SmallIntegerField(null=True, blank=True)),
                ('accountNum', models.IntegerField(null=True, blank=True)),
                ('startDate', models.DateField(null=True, blank=True)),
                ('endDate', models.DateField(null=True, blank=True)),
                ('comment', models.CharField(max_length=300, null=True, blank=True)),
                ('bank', models.ForeignKey(blank=True, to='clientsApp.Bank', null=True)),
                ('city', models.ForeignKey(blank=True, to='clientsApp.City', null=True)),
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30, blank=True)),
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
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
            name='RegularDelivery',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now=True)),
                ('type', models.IntegerField(null=True, blank=True)),
                ('lastUpdate', models.DateTimeField(null=True, blank=True)),
                ('startDate', models.DateTimeField(null=True, blank=True)),
                ('endDate', models.DateTimeField(null=True, blank=True)),
                ('startTime', models.TimeField(null=True, blank=True)),
                ('sourceStreet', models.CharField(max_length=40, null=True, blank=True)),
                ('sourceHomeNum', models.IntegerField(null=True)),
                ('sourceHomeEnter', models.IntegerField(null=True)),
                ('sourceApart', models.IntegerField(null=True)),
                ('destStreet', models.CharField(max_length=40, null=True)),
                ('destHomeNum', models.IntegerField(null=True)),
                ('destHomeEnter', models.IntegerField(null=True)),
                ('destApart', models.IntegerField(null=True)),
                ('numOfPackages', models.IntegerField(null=True)),
                ('numOfBoxes', models.IntegerField(null=True)),
                ('comment', models.CharField(max_length=300, null=True)),
                ('basicPrice', models.IntegerField(null=True)),
                ('totalPrice', models.IntegerField(null=True)),
                ('firstDeliverPrice', models.IntegerField(null=True)),
                ('secondDeliverPrice', models.IntegerField(null=True)),
                ('isSunday', models.BooleanField(default=False)),
                ('isMonday', models.BooleanField(default=False)),
                ('isTuesday', models.BooleanField(default=False)),
                ('isWednesday', models.BooleanField(default=False)),
                ('isThursday', models.BooleanField(default=False)),
                ('isFriday', models.BooleanField(default=False)),
                ('isSaturday', models.BooleanField(default=False)),
                ('endTime', models.DateTimeField(null=True)),
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
                ('contactMan', models.ForeignKey(blank=True, to='clientsApp.ContactMan', null=True)),
                ('customer', models.ForeignKey(blank=True, to='clientsApp.Customer', null=True)),
                ('destCustomer', models.ForeignKey(related_name='destCustomer', to='clientsApp.Customer', null=True)),
                ('doubleType', models.ForeignKey(to='clientsApp.DoubleType', null=True)),
                ('firstDeliver', models.ForeignKey(related_name='first_deliver', to='clientsApp.Employee', null=True)),
                ('secondDeliver', models.ForeignKey(related_name='second_deliver', to='clientsApp.Employee', null=True)),
                ('sourceCustomer', models.ForeignKey(related_name='sourceCustomer', to='clientsApp.Customer', null=True)),
                ('thirdDeliver', models.ForeignKey(related_name='third_deliver', to='clientsApp.Employee', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='RegularSite',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=75, null=True)),
                ('street', models.CharField(max_length=25, null=True)),
                ('streetNum', models.IntegerField(null=True)),
                ('toll', models.IntegerField(null=True)),
                ('city', models.ForeignKey(to='clientsApp.City', null=True)),
                ('client', models.ForeignKey(to='clientsApp.Client', null=True)),
                ('customer', models.ForeignKey(to='clientsApp.Customer', null=True)),
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
            name='Status',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
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
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
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
                ('client', models.ForeignKey(blank=True, to='clientsApp.Client', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='regulardelivery',
            name='urgency',
            field=models.ForeignKey(to='clientsApp.Urgency', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='regulardelivery',
            name='vehicleType',
            field=models.ForeignKey(to='clientsApp.VehicleType', null=True),
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
        migrations.AddField(
            model_name='delivery',
            name='doubleType',
            field=models.ForeignKey(blank=True, to='clientsApp.DoubleType', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='employee',
            field=models.ForeignKey(related_name='delivery_employee', blank=True, to='clientsApp.Employee', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='firstDeliver',
            field=models.ForeignKey(related_name='delivery_first_deliver', blank=True, to='clientsApp.Employee', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='receiver',
            field=models.ForeignKey(related_name='Customer2', blank=True, to='clientsApp.Customer', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='secondDeliver',
            field=models.ForeignKey(related_name='delivery_second_deliver', blank=True, to='clientsApp.Employee', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='sender',
            field=models.ForeignKey(related_name='Customer3', blank=True, to='clientsApp.Customer', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='sourceCity',
            field=models.ForeignKey(related_name='City2', blank=True, to='clientsApp.City', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='thirdDeliver',
            field=models.ForeignKey(related_name='delivery_third_deliver', blank=True, to='clientsApp.Employee', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='urgency',
            field=models.ForeignKey(blank=True, to='clientsApp.Urgency', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='delivery',
            name='vehicleType',
            field=models.ForeignKey(blank=True, to='clientsApp.VehicleType', null=True),
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
            name='priceList',
            field=models.ForeignKey(blank=True, to='clientsApp.PriceList', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='customer',
            name='status',
            field=models.ForeignKey(blank=True, to='clientsApp.Status', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='contactman',
            name='customer',
            field=models.ForeignKey(related_name='contact_man', blank=True, to='clientsApp.Customer', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='contactman',
            name='job',
            field=models.ForeignKey(blank=True, to='clientsApp.Job', null=True),
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
