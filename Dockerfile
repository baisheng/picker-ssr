FROM node:8.4.0
MAINTAINER baisheng.me

ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app
# Expose the app port
EXPOSE 5000

#If the environment in China build please open the following comments
#如果在中国环境下构建请把下面注释打开
RUN npm config set registry https://registry.npm.taobao.org
#RUN rm node_module
RUN npm install
#RUN npm rebuild node-sass
#RUN npm install
RUN npm run build
#RUN PORT=5000
CMD ["npm", "start"]
