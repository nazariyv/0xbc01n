# todo: this will fire up the docker compose file that will in turn fire up front and back
back-dev:
	gunicorn -b 0.0.0.0:5000 back.main:app --reload