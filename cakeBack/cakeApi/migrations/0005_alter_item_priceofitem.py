# Generated by Django 4.2.4 on 2023-11-28 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cakeApi', '0004_alter_item_imgofitem_alter_item_priceofitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='priceOfItem',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
