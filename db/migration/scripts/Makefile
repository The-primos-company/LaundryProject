postgres:
	docker run --name postgres14 -p 5432:5432 -e POSTGRES_USER=root POSTGRES_PASWORD=secret -d postgres:14-alpine
createdb:
	docker exec -it postgres14 createdb --username=root -owner=root project-l

dropdb:
	docker exec -it postgres14 dropdb project-l

migrate_up:
	migrate -path . -database "postgresql://root:secret@localhost:5432/project-l?sslmode=disable" -verbose up

migrate_down:
	migrate -path . -database "postgresql://root:secret@localhost:5432/project-l?sslmode=disable" -verbose down;

.PHONY: postgres createdb dropdb migrate_up migrate_down