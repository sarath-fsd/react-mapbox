FROM FROM node:16.14.0-alpine3.15

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

EXPOSE 3001 

CMD ["npm", "start"]