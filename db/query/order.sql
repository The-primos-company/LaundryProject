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
        client_email,
        garment_total,
        payment_total_payed,
        payment_total,
        payment_total_real
    )
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;


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
    delivery_date = $8,
    garment_total = $9,
    payment_total_payed = $10,
    payment_total = $11
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
