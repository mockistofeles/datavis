from django.shortcuts import render_to_response
from django.template import loader
from django.http import HttpResponse
from sodapy import Socrata
from .models import OpenDataSource, CategoryDataSet, DataSet
import json


def index(request):
    template = loader.get_template('datavis/index.html')
    context = {'title': 'Home'}
    return HttpResponse(template.render(context, request))
    # return render_to_response('datavis/index.html', context)


def search(request):
    datasets = []
    try:
        datasets.append(DataSet.objects.get(category_dataset__name__icontains=request.POST['topic']))
    except (KeyError, DataSet.DoesNotExist):
        datasets = []
    template = loader.get_template('datavis/ds-list.html')
    context = {'datasets': datasets}
    return HttpResponse(template.render(context, request))


def soda_connect(request):
    ods = OpenDataSource.objects.get(pk=1)
    client = Socrata(ods.website, ods.token, ods.user, ods.password)
    ds = DataSet.objects.get(pk=1)
    # https://www.datos.gov.co/resource/wqeu-3uhz.json
    data = client.get(ds.identifier, where="fechaexpedicion > '01/01/2015'", limit=10)
    client.close()
    template = loader.get_template('datavis/base.html')
    data = json.dumps(data, indent=4, sort_keys=True)
    context = {'meds': data}
    return HttpResponse(template.render(context, request))