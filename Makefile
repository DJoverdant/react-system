SHELL := /bin/sh
CONTAINER=postgres
DB_USER=postgres
DB_NAME=backend

.PHONY: init
init: container
	@echo "Creating database "$(DB_NAME)"..."
	@
		clear

		docker exec -it "$(CONTAINER)" psql -U "$(DB_USER)" -d postgres -c \
			"CREATE DATABASE IF NOT EXISTS "$(DB_NAME)";" &>/dev/null

		docker exec -it "$(CONTAINER)" psql -U "$(DB_USER)" -d "$(DB_NAME)" -c \
			"CREATE TABLE IF NOT EXISTS user(
				user_id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
				name TEXT NOT NULL,
				cpf TEXT NOT NULL,
				age NUMBER NOT NULL,
				telephone TEXT NOT NULL,
				email TEXT NOT NULL
			);" &>/dev/null

	@echo "Done!"

.PHONY: run
run: container
	@
		clear

		Roda back
		Roda front

	@

.PHONY: container
container:
	@echo "Checking for "$(CONTAINER)" status..."
	@
		if docker inspect --format='{{.State.Running}}' "$(CONTAINER)" 2>/dev/null | grep -q "true"; then
			echo "$(CONTAINER)" already running."
		else
			echo "Running "$(CONTAINER)"..."
			docker start "$(CONTAINER)" &>/dev/null
		fi

		sleep 1
	@

