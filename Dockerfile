# 基於 Node.js 創建 Docker 映像
FROM node:lts-alpine

# 創建 app 目錄
WORKDIR /app

# 複製 package.json 並安裝依賴項
COPY package*.json ./
RUN npm install

# 複製 app 源代碼
COPY . .

# 啟動 app
CMD [ "npm", "run", "start:dev" ]

