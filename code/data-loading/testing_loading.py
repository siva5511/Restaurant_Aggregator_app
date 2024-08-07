import chardet

with open('zomato.csv', 'rb') as file:
    result = chardet.detect(file.read())
    print(result)
