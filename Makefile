.ONESHELL:
SHELL := /bin/bash
CONTAINER=postgres
DB_USER=postgres
DB_NAME=backend

.PHONY: init
init: container
	@echo "Creating database $(DB_NAME)..."

	docker exec -i $(CONTAINER) psql -U $(DB_USER) -d postgres -c "DROP DATABASE $(DB_NAME);" &>/dev/null

	docker exec -i $(CONTAINER) psql -U $(DB_USER) -d postgres -c "CREATE DATABASE $(DB_NAME);" &>/dev/null

	docker exec -i $(CONTAINER) psql -U $(DB_USER) -d $(DB_NAME) -c "
		CREATE SCHEMA IF NOT EXISTS \"client\";
		CREATE TABLE IF NOT EXISTS \"client\".\"data\" (
			user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			name TEXT NOT NULL,
			cpf TEXT NOT NULL,
			age INTEGER NOT NULL,
			telephone TEXT NOT NULL,
			email TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			deleted_at TIMESTAMPTZ
		); 
	" &>/dev/null
	@echo "Done!"

.PHONY: run
run: container
	@
		clear

		npx tsx src/back/controllers/app.ts
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
