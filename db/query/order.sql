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
        payment_total_real,
        payment_paid,
        payed_at
    )
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;


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
    payment_paid = $11,
    payment_total = $12
WHERE
    id = $1
RETURNING *;

-- name: UpdateOrderIdentifier :one
UPDATE
    orders
SET
    identifier = $2
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

-- name: GetOrdersByClientName :many
SELECT 
    *
FROM 
    orders
WHERE 
    client_name ~* $1
ORDER BY
    identifier
    DESC
LIMIT
    $2 
OFFSET $3;

-- name: GetOrdersByIdentifier :many
SELECT 
    *
FROM 
    orders
WHERE 
    identifier = $1
ORDER BY
    identifier
    DESC
LIMIT
    $2 
OFFSET $3;

-- name: ExistOrderByIdentifier :one
SELECT EXISTS(
SELECT 
    *
FROM 
    orders
WHERE 
    identifier = $1
);


-- name: ListOrders :many
SELECT
    *
FROM
    orders
ORDER BY
    identifier
DESC
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

-- name: GetCurrentOrderIdentifierSequence :one
SELECT currval('orders_identifier_seq');

-- name: SetSequence :exec
SELECT setval('orders_identifier_seq', $1, false);

-- name: SetOrderDeliveredAt :one
UPDATE
    orders
SET
    delivered_at = $2
WHERE
    id = $1
RETURNING *;

-- name: SetOrderPayedAt :one
UPDATE
    orders
SET
    payed_at = $2,
    payment_total_real = 0,
    payment_paid = payment_total_real
WHERE
    id = $1
RETURNING *;

-- name: ListOrdersByCreatedAtRange :many
SELECT
    *
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at
ORDER BY
    identifier
DESC
LIMIT
    @limit_arg OFFSET @offset_arg;

-- name: ListOrdersByDeliveredAtRange :many
SELECT
    *
FROM
    orders
WHERE  delivered_at >= @start_at AND delivered_at <= @end_at
ORDER BY
    delivered_at
DESC
LIMIT
    @limit_arg OFFSET @offset_arg;

-- name: ListOrdersByPayedAtRange :many
SELECT
    *
FROM
    orders
WHERE  payed_at >= @start_at AND payed_at <= @end_at
ORDER BY
    payed_at
DESC
LIMIT
    @limit_arg OFFSET @offset_arg;

-- name: ListOrdersByPayedPendingRange :many
SELECT
    *
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at AND payed_at IS NULL 
ORDER BY
    identifier
DESC
LIMIT
    @limit_arg OFFSET @offset_arg;

-- name: ListOrdersByDeliveredPendingRange :many
SELECT
    *
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at AND delivered_at IS NULL 
ORDER BY
    identifier
DESC
LIMIT
    @limit_arg OFFSET @offset_arg;

-- name: GetOrdersByCreatedAtRangePages :one
SELECT
    COUNT(id)
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at;

-- name: GetOrdersByDeliveredAtRangePages :one
SELECT
    COUNT(id)
FROM
    orders
WHERE  delivered_at >= @start_at AND delivered_at <= @end_at;

-- name: GetOrdersByPayedAtRangePages :one
SELECT
    COUNT(id)
FROM
    orders
WHERE  payed_at >= @start_at AND payed_at <= @end_at;

-- name: GetOrdersByDeliveredPendingRangePages :one
SELECT
    COUNT(id)
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at AND delivered_at IS NULL;

-- name: GetOrdersByPayedPendingRangePages :one
SELECT
    COUNT(id)
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at AND payed_at IS NULL;

-- name: GetOrdersByCreatedAtRangeReports :one
SELECT
    COALESCE(SUM(payment_total_payed)::money, '$0')::VARCHAR as payment_recolected,
    COALESCE(SUM(payment_total_real)::money, '$0')::VARCHAR  as payment_pending,
    COALESCE(SUM(payment_total)::money, '$0')::VARCHAR  as payment_factured,
    COALESCE((SUM(payment_total_payed)::money + SUM(payment_paid)::money)::money, '$0')::VARCHAR  as payment_paid
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at;

-- name: GetOrdersByDeliveredAtRangeReports :one
SELECT
    COALESCE(SUM(payment_total_payed)::money, '$0')::VARCHAR as payment_recolected,
    COALESCE(SUM(payment_total_real)::money, '$0')::VARCHAR  as payment_pending,
    COALESCE(SUM(payment_total)::money, '$0')::VARCHAR  as payment_factured,
    COALESCE((SUM(payment_total_payed)::money + SUM(payment_paid)::money)::money, '$0')::VARCHAR  as payment_paid
FROM
    orders
WHERE  delivered_at >= @start_at AND delivered_at <= @end_at;

-- name: GetOrdersByPayedAtRangeReports :one
SELECT
    COALESCE(SUM(payment_total_payed)::money, '$0')::VARCHAR as payment_recolected,
    COALESCE(SUM(payment_total_real)::money, '$0')::VARCHAR  as payment_pending,
    COALESCE(SUM(payment_total)::money, '$0')::VARCHAR  as payment_factured,
    COALESCE((SUM(payment_total_payed)::money + SUM(payment_paid)::money)::money, '$0')::VARCHAR  as payment_paid
FROM
    orders
WHERE  payed_at >= @start_at AND payed_at <= @end_at;

-- name: GetOrdersByDeliveredPendingRangeReports :one
SELECT
    COALESCE(SUM(payment_total_payed)::money, '$0')::VARCHAR as payment_recolected,
    COALESCE(SUM(payment_total_real)::money, '$0')::VARCHAR  as payment_pending,
    COALESCE(SUM(payment_total)::money, '$0')::VARCHAR  as payment_factured,
    COALESCE((SUM(payment_total_payed)::money + SUM(payment_paid)::money)::money, '$0')::VARCHAR  as payment_paid
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at AND delivered_at IS NULL;

-- name: GetOrdersByPayedPendingRangeReports :one
SELECT
    COALESCE(SUM(payment_total_payed)::money, '$0')::VARCHAR as payment_recolected,
    COALESCE(SUM(payment_total_real)::money, '$0')::VARCHAR  as payment_pending,
    COALESCE(SUM(payment_total)::money, '$0')::VARCHAR  as payment_factured,
    COALESCE((SUM(payment_total_payed)::money + SUM(payment_paid)::money)::money, '$0')::VARCHAR  as payment_paid
FROM
    orders
WHERE  created_at >= @start_at AND created_at <= @end_at AND payed_at IS NULL;
