FROM node:20-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

RUN npm ci --omit=dev

FROM base AS dev

RUN npm install

COPY . .

CMD ["npm","run", "dev"]

FROM base AS worker

COPY . .

CMD ["npx", "ts-node", "temporal/worker.ts"]
