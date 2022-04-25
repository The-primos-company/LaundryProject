@echo off
REM Copyright (c) 2012-2020, EnterpriseDB Corporation.  All rights reserved

REM PostgreSQL server psql runner script for Windows

SET server=localhost

SET database=postgres

SET datatarget=project-l

SET port=5432

SET username=postgres


REM Run migration
"postgres\bin\psql.exe" -h %server% -U root -p %port% -d "%datatarget%"  -f "migration.sql" -a

pause


