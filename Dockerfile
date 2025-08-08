FROM node:23-alpine as base

WORKDIR /app

# Install build tools for native npm dependencies
RUN apk add --no-cache python3 make g++

# Copy package files first for better layer caching
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Build the application
RUN npm run build

# Start command (always dev mode in this example)
FROM base as dev
ENV STAGE=dev
CMD ["npm", "run", "start:dev"]

FROM base as qa
ENV STAGE=qa
CMD ["npm", "run", "start:qa"]

