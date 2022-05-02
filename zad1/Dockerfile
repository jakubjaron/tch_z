#budowanie obrazu from sratch
FROM scratch 
#ustawienie podstawowych informacji za pomocą tagu LABEL
LABEL version="v1" author="Jakub Jaron"
#Dodanie obrazu systemu na którym postawiono serwer
ADD ./alpine-minirootfs-3.15.4-x86_64.tar.gz /
#instalacja zależności
RUN apk add --update npm
COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]