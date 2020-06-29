FROM python:3.8.3-alpine3.12

WORKDIR /back

COPY . /back

RUN pip install -r requirements.txt --no-cache-dir --no-color

WORKDIR /

ENTRYPOINT ["gunicorn", "-b", "0.0.0.0:5000", "back.main:app"]
