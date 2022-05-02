# TCh_Z1
## Zadanie1 - Tecnnologie Chmurowe

## Wszystkie pliki z zadania obowiązkowego znajdują się w katalogu zad1.

### Zadanie 1
### Część obowiązkowa

Pliki z zadania 1 i 2 w katalogu zad1.

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
TU screeny wstawic.

d.
```
sudo docker history zad1:v2 //sprawdzenie warstw kontenera
```

TU screeny wstawic.

Punkt 4.

1. Instalacja qemu.
```
sudo apt-get install qemu-user-static
```

