FROM python:3.8.3-alpine3.12

RUN apk add --virtual build-dependencies build-base gcc libffi-dev python3-dev openssl-dev

WORKDIR /back

COPY requirements.dev.txt /back
COPY requirements.txt /back

RUN pip install -r requirements.dev.txt --no-cache-dir --no-color

COPY . /back

WORKDIR /

ENTRYPOINT ["/bin/sh", "back/entrypoint.sh"]
