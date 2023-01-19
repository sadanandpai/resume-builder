FROM node:latest

WORKDIR /app
COPY package.json ./
RUN yarn
COPY . .
EXPOSE 3000
CMD [ "yarn", "dev" ]

# if any change happens to packages, please build and run the docker again with below command
# $ docker-compose up -d --build