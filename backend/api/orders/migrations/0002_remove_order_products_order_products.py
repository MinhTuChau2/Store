# Generated by Django 5.0.7 on 2024-09-03 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='products',
        ),
        migrations.AddField(
            model_name='order',
            name='products',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]