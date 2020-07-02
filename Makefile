THISDIR=$(PWD)

back-dev:
	docker build ./back/ -t dbp:latest
	docker run -p 5050:8080 \
	-v $(THISDIR)/back/db:/back/db \
	dbp
start-dev:
	docker-compose up
