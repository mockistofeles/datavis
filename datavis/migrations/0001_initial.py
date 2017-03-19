# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2017-02-21 02:44
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryDataSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='DataSet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identifier', models.CharField(max_length=200)),
                ('category_dataset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='datavis.CategoryDataSet')),
            ],
        ),
        migrations.CreateModel(
            name='OpenDataSource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('website', models.CharField(max_length=200)),
                ('token', models.CharField(max_length=200)),
                ('user', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='dataset',
            name='open_data_source',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='datavis.OpenDataSource'),
        ),
    ]