FROM node:16.14-alpine
EXPOSE 3000
WORKDIR /app-frontend
COPY . .
COPY ./package.json .
RUN npm install
CMD ["npm", "install"]