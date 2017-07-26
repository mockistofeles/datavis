from django.template import loader
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views.generic import ListView, DetailView
from sodapy import Socrata
from .models import OpenDataSource, CategoryDataSet, DataSet
import json


def index(request):
    template = loader.get_template('datavis/index.html')
    context = {'title': 'Home'}
    return HttpResponse(template.render(context, request))


def filter(request):
    # topic = request.POST['topic']
    # datasets = []
    # open_data_sources = []
    # qs = DataSet.objects.filter(category_dataset__name__icontains=topic)
    # if request.POST.__contains__('ods'):
    #     qs = qs.filter(open_data_source_id=request.POST['ods'])
    # for q in qs:
    #     datasets.append(q)
    #    if open_data_sources.count(q.open_data_source) == 0:
    #         open_data_sources.append(q.open_data_source)
    # response_data = {
    #     'datasets': datasets,
    #     'open_data_sources': open_data_sources
    # }
    response_data = {}
    response_data['result'] = 'Success!'
    return HttpResponse(
        json.dumps(response_data),
        content_type="application/json"
    )


def datavis(request, dataset_id):
    ods = OpenDataSource.objects.get(pk=dataset_id)
    client = Socrata(ods.website, ods.token, ods.user, ods.password)
    dataset = DataSet.objects.get(pk=dataset_id)
    data = client.get(dataset.identifier)
    metadata = client.get_metadata(dataset.identifier)
    client.close()
    template = loader.get_template('datavis/datavis.html')
    data = json.dumps(data, indent=4, sort_keys=True)
    context = {'data': data, 'metadata': metadata, 'dataset': dataset}
    return HttpResponse(template.render(context, request))


class SearchDatasetList(ListView):
    template_name = 'datavis/ds-list.html'
    context_object_name = 'datasets'
    open_data_sources = []

    def get_queryset(self):
        qs = DataSet.objects.filter(category_dataset__name__icontains=self.request.GET['topic'])
        for q in qs:
            if self.open_data_sources.count(q.open_data_source) == 0:
                self.open_data_sources.append(q.open_data_source)
        return qs

    def get_context_data(self, **kwargs):
        context = super(SearchDatasetList, self).get_context_data(**kwargs)
        context['open_data_sources'] = self.open_data_sources
        context['topic'] = self.request.GET['topic']
        return context


class SearchDatasetDetail(DetailView):
    model = DataSet
    template_name = 'datavis/ds-detail.html'
    context_object_name = 'dataset'

    def get_context_data(self, **kwargs):
        context = super(SearchDatasetDetail, self).get_context_data(**kwargs)
        return context
