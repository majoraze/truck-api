FROM mhart/alpine-node:8

RUN npm install -g serverless

ADD . /usr/truck-driver
WORKDIR /usr/truck-driver

RUN npm install

ENV AWS_ACCESS_KEY_ID='A'
ENV AWS_SECRET_ACCESS_KEY='A'

EXPOSE 3000

CMD [ "npm","run", "start:fixture" ]
