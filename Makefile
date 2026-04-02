YELLOW := $(shell tput setaf 3)
GREEN  := $(shell tput setaf 2)
WHITE := $(shell tput sgr0)

DC = docker compose -f

docker\:watch:
	$(DC) docker-compose.dev.yaml watch

docker\:start:
	make docker:clean

	$(DC) docker-compose.prod.yaml up

docker\:clean:
	@echo "$(YELLOW)[Docker]:[Clean] Removing all containers$(WHITE)"
	docker stop $$(docker ps -aq) 2>/dev/null || true
	docker rm $$(docker ps -aq) 2>/dev/null || true

	@echo "$(YELLOW)[Docker]:[Clean] Removing all images$(WHITE)"
	docker rmi -f $$(docker images -aq) 2>/dev/null || true

	@echo "$(YELLOW)[Docker]:[Clean] Removing all volumes$(WHITE)"
	docker volume rm $$(docker volume ls -q) 2>/dev/null || true

	@echo "$(YELLOW)[Docker]:[Clean] Removing all networks$(WHITE)"
	docker network prune -f

	@echo "$(YELLOW)[Docker]:[Clean] Removing build cache$(WHITE)"
	docker builder prune -a -f

	@echo "$(YELLOW)[Docker]:[Clean] Final system prune$(WHITE)"
	docker system prune -a --volumes -f

	@echo "$(GREEN)[Docker]:[Clean] Done! Docker is fresh and clean [Success]$(WHITE)"
