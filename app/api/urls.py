from django.urls import path, include
from rest_framework import routers
from .views import CreateUserView, ListUserView, LoginUserView, ProfileViewSet, DepartmentViewSet, AuthorityViewSet, CompanyViewSet, CourseViewSet, OptionViewSet, ContactViewSet

router = routers.DefaultRouter()

router.register('profile', ProfileViewSet)
router.register('departments', DepartmentViewSet)
router.register('authorities', AuthorityViewSet)
router.register('companies', CompanyViewSet)
router.register('courses', CourseViewSet)
router.register('options', OptionViewSet)
router.register('contacts', ContactViewSet)

urlpatterns = [
    path('create/', CreateUserView.as_view(), name='create'),
    path('users/', ListUserView.as_view(), name='users'),
    path('loginuser/', LoginUserView.as_view(), name='loginuser'),
    path('', include(router.urls)),
]
