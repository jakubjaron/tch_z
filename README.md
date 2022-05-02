# TCh_Z1
## Zadanie1 - Tecnnologie Chmurowe

## Wszystkie pliki z zadania obowiązkowego znajdują się w katalogu zad1.
## Screeny z wykonanych poleceń znajdują się w katalogu images.

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
![screen1](/images/img1.png)

Zrzut z przeglądarki.

![screen2](/images/img2.png)

Po przejściu do /ip

![screen3](/images/img3.png)

d.
```
sudo docker history zad1:v2 //sprawdzenie warstw kontenera
```
![screen4](/images/img4.png)
TU screeny wstawic.

**Punkt 4.**

**1. Instalacja qemu.**
```
sudo apt-get install qemu-user-static
```
![screen5](/images/img5.png)

**2. Tworzenie środowiska budowania obrazów przy pomocy buildx**

```
sudo docker buildx create --name zad1builder

sudo docker buildx use zad1builder

sudo docker buildx inspect --bootstrap

```
![screen6](/images/img6.png)
Potwierdzenie korzystania z utworzonego środowiska.
![screen7](/images/img7.png)
**3.Budowanie obrazów dla wybranych architektur.**
```
sudo docker buildx build -t kubi8/simple_node_server:v1 --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --push .
```
![screen8](/images/img8.png)
Potwierdzenie zbudowanych obrazów.
```
sudo docker buildx imagetools inspect kubi8/simple_node_server:v1
```
![screen9](/images/img9.png)




