FROM node:alpine
MAINTAINER Marcel O'Neil <marcel@marceloneil.com>

WORKDIR /usr/src/locato-server
ADD package.json .
RUN npm install
ADD . .

EXPOSE 3001
CMD ["npm", "start"]
