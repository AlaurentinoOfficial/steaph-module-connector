FROM node:8

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm run knot-build
RUN npm install
COPY . /app

#EXPOSE 8080
CMD ["npm", "run", "kafka"]
