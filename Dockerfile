FROM daocloud.io/library/node:8
# 设置镜像作者
MAINTAINER Basil <baisheng@gmail.com>
# 设置时区
RUN sh -c "echo 'Asia/Shanghai' > /etc/timezone" && \
    dpkg-reconfigure -f noninteractive tzdata

ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN mkdir -p /app
WORKDIR /app
ADD package.json /app/package.json

# Expose the app port
EXPOSE 5000

#If the environment in China build please open the following comments
#如果在中国环境下构建请把下面注释打开
RUN npm config set registry https://registry.npm.taobao.org
#RUN rm node_module
RUN npm install --production -d
ADD . /app
CMD ["npm", "start"]
