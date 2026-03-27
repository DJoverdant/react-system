.ONESHELL:
SHELL := /bin/bash
CONTAINER=postgres
SQL_FILE=src/migration/0001_create_data_tables.up.sql

include .env

.PHONY: init
init: container
	@echo "Preparing enviroment..."
	
	npm install 
	
	echo "Creating database $(DB_NAME)..."
	docker exec -i $(CONTAINER) psql -U $(DB_USER) -d postgres -c "DROP DATABASE IF EXISTS $(DB_NAME);" 
	docker exec -i $(CONTAINER) psql -U $(DB_USER) -d postgres -c "CREATE DATABASE $(DB_NAME);" 
	docker exec -i $(CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) < $(SQL_FILE) 

	@echo "Done!"

.PHONY: run
run: container
	@
		clear
		npx tsx src/back/controllers/app.ts &
		sleep 1
		npm run dev
	@

.PHONY: container
container:
	@echo "Checking for $(CONTAINER) status..."

	if [ "$$(docker inspect --format='{{.State.Running}}' "$(CONTAINER)" 2>/dev/null)" == "true" ]; then \
		echo "$(CONTAINER) already running."; \
	else \
		echo "Starting $(CONTAINER)..."; \
		docker start "$(CONTAINER)" &>/dev/null; \
	fi
	
	sleep 1
