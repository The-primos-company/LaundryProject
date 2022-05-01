-- name: CreateGarment :one
INSERT INTO
    garments (
        id,
        order_id,
        cuantity,
        category,
        gendre,
        color,
        brand,
        price,
        comment,
        defects,
        service_type
    )
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;


-- name: UpdateGarment :one
UPDATE
    garments
SET
    cuantity = $2,
    category = $3,
    gendre = $4,
    color = $5,
    brand = $6,
    price = $7,
    comment = $8,
    defects = $9,
    service_type = $10
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
    order_id = $1
ORDER BY
    created_at;

-- name: DeleteGarment :exec
DELETE
FROM
    orders
WHERE id = $1;
