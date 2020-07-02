THISDIR=$(PWD)

back-dev:
	docker build ./back/ -t dbp:latest
	docker run -p 5050:5000 \
	-v $(THISDIR)/back/db:/back/db \
	dbp