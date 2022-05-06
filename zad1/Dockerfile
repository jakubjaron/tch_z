#budowanie obrazu from sratch
FROM alpine:latest 
#ustawienie podstawowych informacji za pomocą tagu LABEL
LABEL version="v1" author="Jakub Jaron"
#instalacja zależności
RUN apk add --update npm
COPY ./zad1/package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
