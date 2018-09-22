FROM node:8

WORKDIR /connector
COPY . /connector
RUN npm run knot-build
RUN npm install

#EXPOSE 8080
CMD ["npm", "run", "kafka"]
