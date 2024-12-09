FROM ghcr.io/puppeteer/puppeteer:23.10.1

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    # PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
    PUPPETEER_EXECUTABLE_PATH=/usr/src/app/node_modules/puppeteer-core/lib/cjs/puppeteer/node/BrowserLauncher.js:86

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "index.js" ]