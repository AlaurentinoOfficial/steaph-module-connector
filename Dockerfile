FROM node:10

WORKDIR /app
COPY package.json /app
RUN npm run knot-build
RUN npm i
COPY . /app

#EXPOSE 8080
CMD ["npm", "run", "kafka"]
