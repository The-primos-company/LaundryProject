-- name: CreateOrder :one
INSERT INTO
    orders (
        id,
        recieved_date,
        delivery_date,
        client_name,
        client_id,
        client_address,
        client_phone,
        client_email
    )
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;


-- name: UpdateOrder :one
UPDATE
    orders
SET
    client_name = $2,
    client_id = $3,
    client_address = $4,
    client_phone = $5,
    client_email = $6,
    recieved_date = $7,
    delivery_date = $8
WHERE
    id = $1
RETURNING *;

-- name: GetOrder :one
SELECT
    *
FROM
    orders
WHERE
    id = $1
LIMIT
    1;

-- name: ListOrders :many
SELECT
    *
FROM
    orders
ORDER BY
    name
LIMIT
    $1 OFFSET $2;

-- name: DeleteOrder :exec
DELETE
FROM
    orders
WHERE id = $1;


-- name: GetNextOrderIdentifier :one
SELECT
    identifier + 1
FROM
    orders
ORDER BY
    identifier
DESC
LIMIT 1;
