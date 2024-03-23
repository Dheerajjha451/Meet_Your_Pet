from dog_breed_names import dog_names

names = dog_names()

for i in names:
    print(i.split("-")[1])
    break
