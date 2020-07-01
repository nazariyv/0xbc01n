# todo: this will fire up the docker compose file that will in turn fire up front and back
back-dev:
	docker build ./back/ -t dbp:latest
	docker run -p 5000:5000 \
	-v /home/naz/git/0xbc01n-priv/back/db:/back/db \
	dbp