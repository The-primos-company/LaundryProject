-- name: CreatePrice :one
INSERT INTO
    prices (
        id,
        category,
        price_washing,
        price_ironing
    )
VALUES
    ($1, $2, $3, $4) RETURNING *;


-- name: UpdatePrice :one
UPDATE
    prices
SET
    category = $2,
    price_washing = $3,
    price_ironing = $4
WHERE
    id = $1
RETURNING *;

-- name: GetPrice :one
SELECT
    *
FROM
    prices
WHERE
    id = $1
LIMIT
    1;

-- name: ListPricesByCategory :many
SELECT
    *
FROM
    prices
WHERE 
    category ~* $3
ORDER BY
    category
ASC
LIMIT
    $1 OFFSET $2;

-- name: ListPricesAll :many
SELECT
    *
FROM
    prices
ORDER BY
    category
ASC;

-- name: DeletePrice :exec
DELETE
FROM
    prices
WHERE id = $1;


-- name: ListPrices :many
SELECT
    *
FROM
    prices
ORDER BY
    category
ASC
LIMIT
    $1 OFFSET $2;