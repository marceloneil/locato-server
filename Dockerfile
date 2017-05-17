FROM node:alpine
MAINTAINER Marcel O'Neil <marcel@marceloneil.com>

ADD . /usr/src/locato-server
WORKDIR /usr/src/locato-server
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
