from django.contrib import admin
from .models import OpenDataSource, CategoryDataSet, DataSet

admin.site.register(OpenDataSource)
admin.site.register(CategoryDataSet)
admin.site.register(DataSet)
