FROM node:latest
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 4555

ENTRYPOINT [ "node","payments.js" ]


