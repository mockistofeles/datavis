from django.conf.urls import url
from django.contrib import admin

from . import views

app_name = 'datavis'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^admin/', admin.site.urls),
    url(r'^open/', views.soda_connect, name='open'),
    url(r'^search/', views.search, name='search'),
    url(r'^filter/', views.filter, name='filter')
]
