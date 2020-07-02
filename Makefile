THISDIR=$(PWD)

# docker run -p 5050:8080 \

back-dev:
	docker build ./back/ -t dbp:latest
	docker run \
	--network host \
	-v $(THISDIR)/back/db:/back/db \
	-v ~/.ocean/keeper-contracts/artifacts:/.ocean/keeper-contracts/artifacts \
	dbp
start-dev:
	docker-compose up --build
