@echo off
REM Copyright (c) 2012-2020, EnterpriseDB Corporation.  All rights reserved

REM PostgreSQL server psql runner script for Windows

SET server=localhost

SET database=postgres

SET datatarget=project-l

SET port=5432

SET username=postgres

REM Run add postgres folder
mkdir postgres

REM Run install postgres
"postgresql-14.2-2-windows-x64.exe"

REM Run create user
"postgres\bin\psql.exe" -h %server% -U %username% -p %port% -c "create user root with password 'secret'"

REM Run create db
"postgres\bin\psql.exe" -h %server% -U %username% -p %port% -c "CREATE DATABASE \"%datatarget%\" OWNER root"

REM Run migrateOrders
"postgres\bin\psql.exe" -h %server% -U root -p %port% -d "%datatarget%"  -c "CREATE TABLE "orders" ("id" uuid UNIQUE PRIMARY KEY NOT NULL,"identifier" SERIAL NOT NULL,"recieved_date" timestamptz NOT NULL,"delivery_date" timestamptz NOT NULL,"client_name" varchar NOT NULL,"client_id" varchar NOT NULL,"client_address" varchar NOT NULL,"client_phone" varchar NOT NULL,"client_email" varchar NOT NULL,"garment_total" numeric NOT NULL,"payment_total_payed" MONEY NOT NULL,"payment_total" MONEY NOT NULL,"payment_total_real" MONEY NOT NULL,"created_at" timestamptz NOT NULL DEFAULT (now()));"

REM Run migrateGarments
"postgres\bin\psql.exe" -h %server% -U root -p %port% -d "%datatarget%"  -c "CREATE TABLE "garments" ("id" uuid UNIQUE PRIMARY KEY NOT NULL,"order_id" uuid NOT NULL,"cuantity" NUMERIC NOT NULL,"category" varchar NOT NULL,"gendre" varchar NOT NULL,"color" varchar NOT NULL,"brand" varchar NOT NULL,"price" varchar NOT NULL,"comment" varchar NOT NULL,"defects" varchar NOT NULL,"created_at" timestamptz NOT NULL DEFAULT (now())); ALTER TABLE "garments" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");"

REM Run migrateIndexes
"postgres\bin\psql.exe" -h %server% -U root -p %port% -d "%datatarget%"  -c "CREATE INDEX ON "orders" ("identifier"); CREATE INDEX ON "garments" ("order_id");"

REM Run Install printer
"POS_Printer_Driver_Setup_V7.17.exe"

REM Run start program
"LaundryProject.exe"

pause


