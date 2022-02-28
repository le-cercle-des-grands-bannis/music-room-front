.PHONY: development build start lint install build

DOCKER_COMPOSE_RUN_OPTIONS=--rm
ifeq (${CI},true)
    DOCKER_COMPOSE_RUN_OPTIONS=--rm --user root -T
endif

development:
	docker-compose run --service-ports $(DOCKER_COMPOSE_RUN_OPTIONS) front run dev

build:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) front run build

start:
	docker-compose run --service-ports $(DOCKER_COMPOSE_RUN_OPTIONS) front run start

lint:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) front run lint

install:
	docker-compose run $(DOCKER_COMPOSE_RUN_OPTIONS) front install

