FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy all files including .env
COPY . .

CMD ["node", "index.js"] 