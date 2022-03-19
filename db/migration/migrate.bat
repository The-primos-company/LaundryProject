//Dont use it
migrate -path . -database "postgresql://root:secret@localhost:5432/project-l?sslmode=disable" -verbose up;