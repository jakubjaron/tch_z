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
![screen9](/images/img11.png)


## Dodatek 1
simple_server.yaml

W pliku yaml konfigurujemy kolejno

na jakiej gałęzi będzie wykonywany workflow po użyciu commit w tym przypadku w gałęzi main.

Ustawiamy zmienne środowiskowe nazwa rejestru i obrazu w tym przypadku nazwa naszego repozytorium.

Przydzielamy uprawnienia dla naszego GITHUB_TOKEN - read, write.

Zadanie jest uruchamiane na najnowszej wersji Ubuntu.

Kolejno kroki:

Sprawdzamy repozytorium - checkout

Konfigurujemy qemu, dokcer buildx.

Ustawiamy eksport cache.

Logujemy się do GitHub Container registry, używamy naszego GITHUB_TOKENA i nazwy użytkowanika repozytorium.

Eksportujemy tagi i nagłówki które będą zastosowane do naszego obrazu.

Następnie budujemy obraz na podstawie naszego Dockerfile znajdującym się w naszym repozytorium i psuhujemy go do Github Package Repository.

Na koniec jeszcze przenosimy cache.

```yaml
name: Github Actions simple node server
on:
  push:
    branches: [main]    
  pull_request:
    branches: [main]     

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

#uprawnienia potrzebne do jeśli wysyłane do ghcr.io
permissions: 
  contents: read
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
          registry: ${{ env.REGISTRY }}
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@98669ae865ea3cffbcbaa878cf57c20bbf1c6c38
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
      

      
      - name: Build and push Docker image
        uses: docker/build-push-action@ad44023a93711e3deb337508980b4b5e9bcdc5dc
        with:
          context: ./
          file: ./zad1/Dockerfile
          platforms: linux/arm/v7,linux/arm64/v8,linux/amd64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
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

![screen9](/images/img10.png)

Czas wykonania bez cache - 59s.

![screen10](/images/bez_cache.png)

Czas wykonania po zastosowaniu cache - 32s.

![screen11](/images/z_cache.png)



## Dodatek 2
### 1.

a. 

```docker
sudo docker run -d -p 6677:5000 --restart always --name registry registry:latest
```

b.

Pobranie obrazu ubuntu w najnowszej wersji.

```bash
sudo docker pull ubuntu:latest
```

Dodanie tagu do obrazu

```
sudo docker tag ubuntu:latest localhost:6677/ubuntu-img

```
Dodanie obrazu do lokalnego rejestru działającym na porcie 6677.
```
sudo docker push localhost:6677/ubuntu-img

```
Usunięcie lokalnych obrazów, aby przetestować prywatny rejestr.
```
sudo docker image remove ubuntu:latest

sudo docker image remove localhost:6677/ubuntu-img


```

Pobranie naszego obrazu z rejestru prywatnego.

```
sudo docker pull localhost:6677/ubuntu-img

```

![screen](/images/registry.png)


### 2.


Utworzenie pliku zawierający nazwe użytkownika i hasło.

```
sudo docker run --entrypoint htpasswd httpd:2 -Bbn testuser testpassword > auth/htpasswd

```
Uruchomienie kkontenera z zastosowaniem htpasswd i wygenerowanego certyfikatu.
```
sudo docker run -d   -p 6677:5000   --restart=always   --name registry2   -v "$(pwd)"/auth:/auth   -e "REGISTRY_AUTH=htpasswd"   -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm"   -e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd   -v "$(pwd)"/certs:/certs   -e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/domain.crt   -e REGISTRY_HTTP_TLS_KEY=/certs/domain.key   registry:2

```
Próba wysłania obrazu do rejestru.
```
sudo docker tag ubuntu:latest localhost:6677/my-ubuntu

sudo docker push localhost:6677/ubuntu-img
```
![dod](/images/dod2.png)


