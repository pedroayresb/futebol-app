FROM node:16.14-alpine
EXPOSE 5432
WORKDIR /app-backend
COPY . .
COPY ./package.json .
RUN npm install
CMD ["npm","run", "start"]