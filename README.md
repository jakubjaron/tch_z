# TCh_Z1
## Zadanie1 - Tecnnologie Chmurowe

## Wszystkie pliki z zadania obowiązkowego znajdują się w katalogu zad1.

### Zadanie 1
### Część obowiązkowa

**Punkt 3.**

a. 
```
sudo docker build -f Dockerfile -t zad1:v2 . 
```
b. 
```
sudo docker run -d --name z2 -p 8080:8080 zad1:v2 // uruchomienie kontenera w tle
```
c. 
```
sudo docker logs z2 //sprawdzenie logów uruchomionego serwera
```

