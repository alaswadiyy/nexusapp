FROM node:18-alpine

WORKDIR /app

# Copy package manifest and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "src/index.js"]
