# TCh_Z1
## Zadanie1 - Tecnnologie Chmurowe

## Wszystkie pliki z zadania obowiązkowego znajdują się w katalogu zad1.
## Screeny z wykonanych poleceń znajdują się w katalogu images.

### Zadanie 1
### Część obowiązkowa

Pliki z zadania 1 i 2 w katalogu zad1.

**Punkt 3.**

a. 

```bash
sudo docker build -f Dockerfile -t zad1:v2 . 
```
b. 

```bash
sudo docker run -d --name z2 -p 8080:8080 zad1:v2 // uruchomienie kontenera w tle
```
c. 

```bash
sudo docker logs z2 //sprawdzenie logów uruchomionego serwera
```
![screen1](/images/img1.png)

Zrzut z przeglądarki.

![screen2](/images/img2.png)

Po przejściu do /ip

![screen3](/images/img3.png)

d.
```bash
sudo docker history zad1:v2 //sprawdzenie warstw kontenera
```
![screen4](/images/img4.png)
TU screeny wstawic.

**Punkt 4.**

**1. Instalacja qemu.**
```bash
sudo apt-get install qemu-user-static
```
![screen5](/images/img5.png)

**2. Tworzenie środowiska budowania obrazów przy pomocy buildx**

```bash
sudo docker buildx create --name zad1builder

sudo docker buildx use zad1builder

sudo docker buildx inspect --bootstrap

```
![screen6](/images/img6.png)
Potwierdzenie korzystania z utworzonego środowiska.
![screen7](/images/img7.png)
**3.Budowanie obrazów dla wybranych architektur.**
```bash
sudo docker buildx build -t kubi8/simple_node_server:v1 --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --push .
```
![screen8](/images/img8.png)
Potwierdzenie zbudowanych obrazów.
```bash
sudo docker buildx imagetools inspect kubi8/simple_node_server:v1
```
![screen9](/images/img9.png)


## Dodatek 1
simple_server.yaml
```yaml
name: Github Actions simple node server
on:
  push:
    branches: [main]    
  pull_request:
    branches: [main]     

#uprawnienia potrzebne do jeśli wysyłane do ghcr.io
permissions: 
  packages: write


jobs:
  build-push-images:
    name: Budowa i publikacja obrazow na rozne architektury
    runs-on: ubuntu-latest
    steps:
       #Sprawdzenie kodu   
      - name: Checkout
        uses: actions/checkout@v2

      #ustawienie QEMU
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v1
      
      # ustawienie Docker buildx
      - name: Set up Docker Buildx
        id: buildx
        uses: docker/setup-buildx-action@v1

      #Ustawienie eksportu cache
      - name: Cache Docker layers
        uses: actions/cache@v2
        with:
          path: /tmp/.buildx-cache
          key: ${{ runner.os }}-single-buildx-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-single-buildx

      #logowanie do Github container registry
      - name: Login to GHCR
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v1
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}
      #logowanie do Dockerhub
      - name: Login to Docker Hub
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_ACCESS_TOKEN }}

      
      #Zbudowanie obrazów i wysłanie na Docker Hub
      - name: Build and push
        id: dokcer_build
        uses: docker/build-push-action@v2
        with:
          context: ./
          file: ./zad1/Dockerfile
          platforms: linux/arm/v7,linux/arm64/v8,linux/amd64
          push: ${{ github.event_name != 'pull_request' }}
          tags: kubi8/simple_node_server:v2
          #eksportowanie cache
          cache-from: type=local,src=/tmp/.buildx-cache
          cache-to: type=local,dest=/tmp/.buildx-cache-new
          
      #przeniesienie cache do wskazanego folderu.
      - name: Move cache
        run: |
          rm -rf /tmp/.buildx-cache
          mv /tmp/.buildx-cache-new /tmp/.buildx-cache
```

Wynik działania.

![screen9](/images/img9.png)


