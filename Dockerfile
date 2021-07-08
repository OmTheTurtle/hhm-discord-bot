FROM node:14

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./ .

EXPOSE 80
EXPOSE 443

CMD [ "npm", "start" ]
