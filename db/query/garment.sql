-- name: CreateGarment :one
INSERT INTO
    garments (
        id,
        order_id,
        total,
        category,
        gendre,
        color,
        brand,
        price,
        comment,
        defects
    )
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;


-- name: UpdateGarment :one
UPDATE
    garments
SET
    total = $2,
    category = $3,
    gendre = $4,
    color = $5,
    brand = $6,
    price = $7,
    comment = $8,
    defects = $9
WHERE
    id = $1
RETURNING *;

-- name: GetGarment :one
SELECT
    *
FROM
    garments
WHERE
    id = $1
LIMIT
    1;

-- name: ListGarmentsByOrder :many
SELECT
    *
FROM
    garments
WHERE 
    order_id = $3
ORDER BY
    created_at
LIMIT
    $1 OFFSET $2;

-- name: DeleteGarment :exec
DELETE
FROM
    orders
WHERE id = $1;
