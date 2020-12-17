from os import truncate
from django.core.exceptions import EmptyResultSet
from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields import BLANK_CHOICE_DASH, related


class Department(models.Model):
    name = models.CharField(verbose_name='名前', max_length=50, unique=True)
    is_deleted = models.BooleanField(verbose_name='削除済', default=False)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name


class Authority(models.Model):
    name = models.CharField(verbose_name='名前', max_length=50, unique=True)
    is_deleted = models.BooleanField(verbose_name='削除済', default=False)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user_profile = models.OneToOneField(
        User, verbose_name='ユーザプロフィール', related_name='user_profile', unique=True, on_delete=models.CASCADE)
    nickname = models.CharField(
        verbose_name='ニックネーム', max_length=50, unique=True)
    department = models.ForeignKey(
        Department, verbose_name='部署', on_delete=models.PROTECT, related_name='department')
    authority = models.ForeignKey(
        Authority, verbose_name='権限', on_delete=models.PROTECT, related_name='authority')
    is_deleted = models.BooleanField(verbose_name='削除済', default=False)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.user_profile.username


class Company(models.Model):
    name = models.CharField(verbose_name='企業名', max_length=50)
    furigana = models.CharField(verbose_name='フリガナ', max_length=50, blank=True)
    responsible_name = models.CharField(
        verbose_name='担当者', max_length=50, blank=True)
    phone_number = models.CharField(
        verbose_name='電話番号', max_length=12, blank=True)
    fax_number = models.CharField(
        verbose_name='FAX番号', max_length=12, blank=True)
    postal_code = models.CharField(
        verbose_name='郵便番号', max_length=8, blank=True)
    address = models.CharField(verbose_name='住所', max_length=50, blank=True)
    is_deleted = models.BooleanField(verbose_name='削除済', default=False)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(verbose_name='名前', max_length=50, unique=True)
    is_deleted = models.BooleanField(verbose_name='削除済', default=False)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name


class Option(models.Model):
    name = models.CharField(verbose_name='名前', max_length=50, unique=True)
    is_deleted = models.BooleanField(verbose_name='削除済', default=False)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True)

    def __str__(self):
        return self.name


class Contact(models.Model):
    PAYMENT_METHOD = (
        ('0', '窓口'),
        ('1', '請求'),
        ('2', 'その他'),
    )
    RESULT_SUBMISSION_METHOD = (
        ('0', 'まとめて'),
        ('1', '月毎'),
        ('2', 'その他'),
    )
    company = models.ForeignKey(
        Company, verbose_name='企業', on_delete=models.PROTECT, related_name='company')
    course = models.ForeignKey(
        Course, verbose_name='コース', on_delete=models.PROTECT, related_name='course')
    option = models.ForeignKey(
        Option, verbose_name='オプション', on_delete=models.PROTECT, related_name='option')
    payment_method = models.CharField(
        verbose_name='支払い方法', max_length=2, choices=PAYMENT_METHOD, default='0')
    payment_method_other = models.CharField(
        verbose_name='支払い方法その他', max_length=50, blank=True)
    needs_charge = models.BooleanField(verbose_name='診断書料', default=False)
    exists_list = models.BooleanField(verbose_name='名簿', default=False)
    exists_prior_submission_document = models.BooleanField(
        verbose_name='事前送付', default=False)
    company_copies = models.IntegerField(verbose_name='結果送付会社', default=0)
    private_copies = models.IntegerField(verbose_name='結果個人送付', default=0)
    needs_to_put_grue = models.BooleanField(verbose_name='のり付け', default=False)
    result_submission_method = models.CharField(
        verbose_name='結果送付方法', max_length=2, choices=RESULT_SUBMISSION_METHOD, default='0')
    result_submission_method_other = models.CharField(
        verbose_name='結果送付方法その他', max_length=50, blank=True)
    considerations = models.TextField(verbose_name='注意事項', blank=True)
    representatiove = models.ForeignKey(
        User, verbose_name='担当者名', on_delete=models.PROTECT)
    related_file = models.ImageField(verbose_name='関連ファイル', blank=True)
    is_deleted = models.BooleanField(verbose_name='削除済', default=False)
    created_at = models.DateTimeField(
        verbose_name='作成日時', auto_now_add=True)
    updated_at = models.DateTimeField(
        verbose_name='更新日時', auto_now=True)
    
    def __str__(self):
        return self.company.name + '_' + str(self.course)
