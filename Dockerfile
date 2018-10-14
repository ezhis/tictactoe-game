FROM node:8

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

COPY ./server /app/server
RUN yarn run build:server

COPY ./client /app/client
RUN yarn run build:client




#RUN yarn run build

EXPOSE 8080

CMD [ "yarn", "run", "start" ]
