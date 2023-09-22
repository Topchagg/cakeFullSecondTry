
def findBiggestNumber(querySet):
    a = 0
    for i in querySet:
        if i.priceOfItem > a:
            a = i.priceOfItem
    return a