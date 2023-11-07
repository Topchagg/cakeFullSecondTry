def findBiggestNumber(querySet):
    a = 0
    for i in querySet:
        if i.priceOfItem > a:
            a = i.priceOfItem
    return a

# i.priceOfItem = querySet[i].priceOfItem
# set - несколько объектов
# i - объект 0 1 2 3
def findPkOfNeededCategory(querySet):
    for i in querySet:
        return i.pk
    
def findGeneralPriceOfOrder(itemsOfOrder):
    total = 0
    amount = 0
    for i in itemsOfOrder:
        total += i['priceOfItem'] * i['Amount']
        amount += i['Amount']

    return total, amount

        
    