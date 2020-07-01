FROM python:3.8.3-alpine3.12

RUN apk add --virtual build-dependencies build-base gcc

WORKDIR /back

COPY . /back

RUN pip install -r requirements.dev.txt --no-cache-dir --no-color

WORKDIR /

ENTRYPOINT ["/bin/sh", "back/entrypoint.sh"]
