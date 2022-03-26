-- name: createOrder :one
INSERT INTO
    orders (
        id,
        identifier,
        recieved_date,
        delivery_date,
        client_id,
        created_at
    )
VALUES
    ($1, $2, $3, $4, $5, $6) RETURNING *;


-- name: updateOrder :one
UPDATE
    orders
SET
    recieved_date = $2,
    delivery_date = $3
WHERE
    id = $1
RETURNING *;

-- name: Getorder :one
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

-- name: deleteOrder :exec
DELETE
FROM
    orders
WHERE id = $1;
