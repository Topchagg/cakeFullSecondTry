# Generated by Django 4.2.4 on 2023-11-29 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cakeApi', '0006_alter_item_priceofitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='descriptionOfItem',
            field=models.TextField(max_length=2000),
        ),
    ]
