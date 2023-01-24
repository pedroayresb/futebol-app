FROM node:16.14-alpine
EXPOSE 3001
WORKDIR /app-backend
COPY . .
COPY ./package.json .
RUN npm install
CMD ["npm","run", "start"]