FROM python:3.8.3-slim

WORKDIR /back

COPY . /back

RUN pip install -r requirements.dev.txt --no-cache-dir --no-color

WORKDIR /

ENTRYPOINT ["/bin/sh", "back/entrypoint.sh"]
