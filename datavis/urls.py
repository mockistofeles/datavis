from django.conf.urls import url
from django.contrib import admin

from . import views

app_name = 'datavis'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^admin/', admin.site.urls),
    url(r'^search/', views.SearchDatasetList.as_view(), name='search'),
    url(r'^filter/', views.filter, name='filter'),
    url(r'^detail/(?P<pk>[0-9]+)/', views.SearchDatasetDetail.as_view(), name='detail'),
    url(r'^datavis/(?P<dataset_id>[0-9]+)/', views.datavis, name='datavis')
]
