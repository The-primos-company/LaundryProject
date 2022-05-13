-- name: CreatePrice :one
INSERT INTO
    prices (
        id,
        category,
        price_washing,
        price_ironing,
        price_dyeing,
        cost_washing,
        cost_ironing,
        cost_dyeing
    )
VALUES
    (@id, @category, @price_washing, @price_ironing, @price_dyeing, @cost_washing, @cost_ironing, @cost_dyeing) RETURNING *;


-- name: UpdatePrice :one
UPDATE
    prices
SET
    category = @category,
    price_washing = @price_washing,
    price_ironing = @price_ironing,
    price_dyeing = @price_dyeing,
    cost_washing = @cost_washing,
    cost_ironing = @cost_ironing, 
    cost_dyeing = @cost_dyeing
WHERE
    id = @id
RETURNING *;

-- name: GetPrice :one
SELECT
    *
FROM
    prices
WHERE
    id = @id
LIMIT
    1;

-- name: ListPricesByCategory :many
SELECT
    *
FROM
    prices
WHERE 
    category ~* @category
ORDER BY
    category
ASC
LIMIT
    @limit_arg OFFSET @offset_arg;

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
WHERE id = @id;


-- name: ListPrices :many
SELECT
    *
FROM
    prices
ORDER BY
    category
ASC
LIMIT
    @limit_arg OFFSET @offset_arg;