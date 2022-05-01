-- name: CreateClient :one
INSERT INTO
    clients (
        id,
        name,
        identification,
        address,
        phone,
        email
    )
VALUES
    ($1, $2, $3, $4, $5, $6) RETURNING *;


-- name: UpdateClient :one
UPDATE
    clients
SET
    name = $2,
    identification = $3,
    address = $4,
    phone = $5,
    email = $6
WHERE
    id = $1
RETURNING *;

-- name: DeleteClient :exec
DELETE
FROM
    clients
WHERE id = $1;

-- name: GetClient :one
SELECT
    *
FROM
    clients
WHERE
    id = $1
LIMIT
    1;

-- name: GetClientByIdentification :many
SELECT 
    *
FROM 
    clients
WHERE 
    identification = $1
ORDER BY
    created_at
    DESC
LIMIT
    $2
OFFSET $3;

-- name: GetClientByName :many
SELECT 
    *
FROM 
    clients
WHERE 
    name ~* $1
ORDER BY
    created_at
    DESC
LIMIT
    $2 
OFFSET $3;

-- name: ListClients :many
SELECT
    *
FROM
    clients
ORDER BY
    created_at
DESC
LIMIT
    $1 OFFSET $2;

