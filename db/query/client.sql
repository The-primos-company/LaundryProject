-- name: createClient :one
INSERT INTO
    clients (
        id,
        name,
        phone,
        address
    )
VALUES
    ($1, $2, $3, $4) RETURNING *;

-- name: updateClient :one
UPDATE
    clients
SET
    name = $2,
    phone = $3,
    address = $4
WHERE
    id = $1
RETURNING *;

-- name: GetClient :one
SELECT
    *
FROM
    clients
WHERE
    id = $1
LIMIT
    1;

-- name: ListClients :many
SELECT
    *
FROM
    clients
ORDER BY
    name
LIMIT
    $1 OFFSET $2;

-- name: deleteClient :exec
DELETE
FROM
    clients
WHERE id = $1;
