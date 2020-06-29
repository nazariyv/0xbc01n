FROM python:3.8.3-alpine3.12

WORKDIR /back

COPY . /back

RUN apk add build-base

RUN pip install -r requirements.dev.txt --no-cache-dir --no-color

WORKDIR /

ENTRYPOINT ["/bin/sh", "back/entrypoint.sh"]
