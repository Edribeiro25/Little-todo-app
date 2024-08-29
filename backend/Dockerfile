
FROM node:18-alpine As development

WORKDIR /usr/src/app/

COPY ./server_lunch.sh .

COPY package*.json ./

COPY /prisma /usr/src/app

CMD ["sh", "server_lunch.sh"]
