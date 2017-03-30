from django.db import models


class OpenDataSource(models.Model):
    website = models.CharField(max_length=200)
    token = models.CharField(max_length=200)
    user = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

    def __str__(self):
        return self.website


class CategoryDataSet(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class DataSet(models.Model):
    open_data_source = models.ForeignKey(OpenDataSource, on_delete=models.CASCADE)
    category_dataset = models.ForeignKey(CategoryDataSet, on_delete=models.CASCADE)
    identifier = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.identifier
