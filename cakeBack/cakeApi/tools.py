def findBiggestNumber(querySet):
    a = 0
    for i in querySet:
        if i.priceOfItem > a:
            a = i.priceOfItem
    return a

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

        
    