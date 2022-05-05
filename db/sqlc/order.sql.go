// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.13.0
// source: order.sql

package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createOrder = `-- name: CreateOrder :one
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
        payed_at
    )
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
`

type CreateOrderParams struct {
	ID                uuid.UUID    `json:"id"`
	RecievedDate      time.Time    `json:"recieved_date"`
	DeliveryDate      time.Time    `json:"delivery_date"`
	ClientName        string       `json:"client_name"`
	ClientID          string       `json:"client_id"`
	ClientAddress     string       `json:"client_address"`
	ClientPhone       string       `json:"client_phone"`
	ClientEmail       string       `json:"client_email"`
	GarmentTotal      string       `json:"garment_total"`
	PaymentTotalPayed string       `json:"payment_total_payed"`
	PaymentTotal      string       `json:"payment_total"`
	PaymentTotalReal  string       `json:"payment_total_real"`
	PayedAt           sql.NullTime `json:"payed_at"`
}

func (q *Queries) CreateOrder(ctx context.Context, arg CreateOrderParams) (Order, error) {
	row := q.db.QueryRowContext(ctx, createOrder,
		arg.ID,
		arg.RecievedDate,
		arg.DeliveryDate,
		arg.ClientName,
		arg.ClientID,
		arg.ClientAddress,
		arg.ClientPhone,
		arg.ClientEmail,
		arg.GarmentTotal,
		arg.PaymentTotalPayed,
		arg.PaymentTotal,
		arg.PaymentTotalReal,
		arg.PayedAt,
	)
	var i Order
	err := row.Scan(
		&i.ID,
		&i.Identifier,
		&i.RecievedDate,
		&i.DeliveryDate,
		&i.ClientName,
		&i.ClientID,
		&i.ClientAddress,
		&i.ClientPhone,
		&i.ClientEmail,
		&i.GarmentTotal,
		&i.PaymentTotalPayed,
		&i.PaymentTotal,
		&i.PaymentTotalReal,
		&i.CreatedAt,
		&i.PayedAt,
		&i.DeliveredAt,
	)
	return i, err
}

const deleteOrder = `-- name: DeleteOrder :exec
DELETE
FROM
    orders
WHERE id = $1
`

func (q *Queries) DeleteOrder(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.ExecContext(ctx, deleteOrder, id)
	return err
}

const getCurrentOrderIdentifierSequence = `-- name: GetCurrentOrderIdentifierSequence :one
SELECT currval('orders_identifier_seq')
`

func (q *Queries) GetCurrentOrderIdentifierSequence(ctx context.Context) (int64, error) {
	row := q.db.QueryRowContext(ctx, getCurrentOrderIdentifierSequence)
	var currval int64
	err := row.Scan(&currval)
	return currval, err
}

const getNextOrderIdentifier = `-- name: GetNextOrderIdentifier :one
SELECT
    identifier + 1
FROM
    orders
ORDER BY
    identifier
DESC
LIMIT 1
`

func (q *Queries) GetNextOrderIdentifier(ctx context.Context) (int32, error) {
	row := q.db.QueryRowContext(ctx, getNextOrderIdentifier)
	var column_1 int32
	err := row.Scan(&column_1)
	return column_1, err
}

const getOrder = `-- name: GetOrder :one
SELECT
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
FROM
    orders
WHERE
    id = $1
LIMIT
    1
`

func (q *Queries) GetOrder(ctx context.Context, id uuid.UUID) (Order, error) {
	row := q.db.QueryRowContext(ctx, getOrder, id)
	var i Order
	err := row.Scan(
		&i.ID,
		&i.Identifier,
		&i.RecievedDate,
		&i.DeliveryDate,
		&i.ClientName,
		&i.ClientID,
		&i.ClientAddress,
		&i.ClientPhone,
		&i.ClientEmail,
		&i.GarmentTotal,
		&i.PaymentTotalPayed,
		&i.PaymentTotal,
		&i.PaymentTotalReal,
		&i.CreatedAt,
		&i.PayedAt,
		&i.DeliveredAt,
	)
	return i, err
}

const getOrdersByClientName = `-- name: GetOrdersByClientName :many
SELECT 
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
FROM 
    orders
WHERE 
    client_name ~* $1
ORDER BY
    identifier
    DESC
LIMIT
    $2 
OFFSET $3
`

type GetOrdersByClientNameParams struct {
	ClientName string `json:"client_name"`
	Limit      int32  `json:"limit"`
	Offset     int32  `json:"offset"`
}

func (q *Queries) GetOrdersByClientName(ctx context.Context, arg GetOrdersByClientNameParams) ([]Order, error) {
	rows, err := q.db.QueryContext(ctx, getOrdersByClientName, arg.ClientName, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Order
	for rows.Next() {
		var i Order
		if err := rows.Scan(
			&i.ID,
			&i.Identifier,
			&i.RecievedDate,
			&i.DeliveryDate,
			&i.ClientName,
			&i.ClientID,
			&i.ClientAddress,
			&i.ClientPhone,
			&i.ClientEmail,
			&i.GarmentTotal,
			&i.PaymentTotalPayed,
			&i.PaymentTotal,
			&i.PaymentTotalReal,
			&i.CreatedAt,
			&i.PayedAt,
			&i.DeliveredAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getOrdersByCreatedAtRangePages = `-- name: GetOrdersByCreatedAtRangePages :one
SELECT
    COUNT(id)
FROM
    orders
WHERE  created_at >= $1 AND created_at <= $2
`

type GetOrdersByCreatedAtRangePagesParams struct {
	StartAt time.Time `json:"start_at"`
	EndAt   time.Time `json:"end_at"`
}

func (q *Queries) GetOrdersByCreatedAtRangePages(ctx context.Context, arg GetOrdersByCreatedAtRangePagesParams) (int64, error) {
	row := q.db.QueryRowContext(ctx, getOrdersByCreatedAtRangePages, arg.StartAt, arg.EndAt)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const getOrdersByCreatedAtRangeReports = `-- name: GetOrdersByCreatedAtRangeReports :one
SELECT
    SUM(payment_total_payed) :: money as payment_recolected,
    SUM(payment_total_real) :: money as payment_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.created_at >= $1 AND o.created_at <= $2 
            AND payed_at IS NULL
    ) as orders_payment_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.created_at >= $1 AND o.created_at <= $2 
            AND delivered_at IS NULL
    ) as orders_delivery_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.created_at >= $1 AND o.created_at <= $2 
            AND payed_at IS NOT NULL
    ) as orders_payment_done,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.created_at >= $1 AND o.created_at <= $2 
            AND delivered_at IS NOT NULL
    ) as orders_delivery_done
FROM
    orders
WHERE  created_at >= $1 AND created_at <= $2
`

type GetOrdersByCreatedAtRangeReportsParams struct {
	StartAt time.Time `json:"start_at"`
	EndAt   time.Time `json:"end_at"`
}

type GetOrdersByCreatedAtRangeReportsRow struct {
	PaymentRecolected     string `json:"payment_recolected"`
	PaymentPending        string `json:"payment_pending"`
	OrdersPaymentPending  string `json:"orders_payment_pending"`
	OrdersDeliveryPending string `json:"orders_delivery_pending"`
	OrdersPaymentDone     string `json:"orders_payment_done"`
	OrdersDeliveryDone    string `json:"orders_delivery_done"`
}

func (q *Queries) GetOrdersByCreatedAtRangeReports(ctx context.Context, arg GetOrdersByCreatedAtRangeReportsParams) (GetOrdersByCreatedAtRangeReportsRow, error) {
	row := q.db.QueryRowContext(ctx, getOrdersByCreatedAtRangeReports, arg.StartAt, arg.EndAt)
	var i GetOrdersByCreatedAtRangeReportsRow
	err := row.Scan(
		&i.PaymentRecolected,
		&i.PaymentPending,
		&i.OrdersPaymentPending,
		&i.OrdersDeliveryPending,
		&i.OrdersPaymentDone,
		&i.OrdersDeliveryDone,
	)
	return i, err
}

const getOrdersByDeliveredAtRangePages = `-- name: GetOrdersByDeliveredAtRangePages :one
SELECT
    COUNT(id)
FROM
    orders
WHERE  delivered_at >= $1 AND delivered_at <= $2
`

type GetOrdersByDeliveredAtRangePagesParams struct {
	StartAt sql.NullTime `json:"start_at"`
	EndAt   sql.NullTime `json:"end_at"`
}

func (q *Queries) GetOrdersByDeliveredAtRangePages(ctx context.Context, arg GetOrdersByDeliveredAtRangePagesParams) (int64, error) {
	row := q.db.QueryRowContext(ctx, getOrdersByDeliveredAtRangePages, arg.StartAt, arg.EndAt)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const getOrdersByDeliveredAtRangeReports = `-- name: GetOrdersByDeliveredAtRangeReports :one
SELECT
    SUM(payment_total_payed)::money as payment_recolected,
    SUM(payment_total_real)::money as payment_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.delivered_at >= $1 AND o.delivered_at <= $2 
            AND payed_at IS NULL
    ) as orders_payment_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.delivered_at >= $1 AND o.delivered_at <= $2 
            AND delivered_at IS NULL
    ) as orders_delivery_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.delivered_at >= $1 AND o.delivered_at <= $2 
            AND payed_at IS NOT NULL
    ) as orders_payment_done,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.delivered_at >= $1 AND o.delivered_at <= $2 
            AND delivered_at IS NOT NULL
    ) as orders_delivery_done
FROM
    orders
WHERE  delivered_at >= $1 AND delivered_at <= $2
`

type GetOrdersByDeliveredAtRangeReportsParams struct {
	StartAt sql.NullTime `json:"start_at"`
	EndAt   sql.NullTime `json:"end_at"`
}

type GetOrdersByDeliveredAtRangeReportsRow struct {
	PaymentRecolected     string `json:"payment_recolected"`
	PaymentPending        string `json:"payment_pending"`
	OrdersPaymentPending  string `json:"orders_payment_pending"`
	OrdersDeliveryPending string `json:"orders_delivery_pending"`
	OrdersPaymentDone     string `json:"orders_payment_done"`
	OrdersDeliveryDone    string `json:"orders_delivery_done"`
}

func (q *Queries) GetOrdersByDeliveredAtRangeReports(ctx context.Context, arg GetOrdersByDeliveredAtRangeReportsParams) (GetOrdersByDeliveredAtRangeReportsRow, error) {
	row := q.db.QueryRowContext(ctx, getOrdersByDeliveredAtRangeReports, arg.StartAt, arg.EndAt)
	var i GetOrdersByDeliveredAtRangeReportsRow
	err := row.Scan(
		&i.PaymentRecolected,
		&i.PaymentPending,
		&i.OrdersPaymentPending,
		&i.OrdersDeliveryPending,
		&i.OrdersPaymentDone,
		&i.OrdersDeliveryDone,
	)
	return i, err
}

const getOrdersByIdentifier = `-- name: GetOrdersByIdentifier :many
SELECT 
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
FROM 
    orders
WHERE 
    identifier = $1
ORDER BY
    identifier
    DESC
LIMIT
    $2 
OFFSET $3
`

type GetOrdersByIdentifierParams struct {
	Identifier int32 `json:"identifier"`
	Limit      int32 `json:"limit"`
	Offset     int32 `json:"offset"`
}

func (q *Queries) GetOrdersByIdentifier(ctx context.Context, arg GetOrdersByIdentifierParams) ([]Order, error) {
	rows, err := q.db.QueryContext(ctx, getOrdersByIdentifier, arg.Identifier, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Order
	for rows.Next() {
		var i Order
		if err := rows.Scan(
			&i.ID,
			&i.Identifier,
			&i.RecievedDate,
			&i.DeliveryDate,
			&i.ClientName,
			&i.ClientID,
			&i.ClientAddress,
			&i.ClientPhone,
			&i.ClientEmail,
			&i.GarmentTotal,
			&i.PaymentTotalPayed,
			&i.PaymentTotal,
			&i.PaymentTotalReal,
			&i.CreatedAt,
			&i.PayedAt,
			&i.DeliveredAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getOrdersByPayedAtRangePages = `-- name: GetOrdersByPayedAtRangePages :one
SELECT
    COUNT(id)
FROM
    orders
WHERE  payed_at >= $1 AND payed_at <= $2
`

type GetOrdersByPayedAtRangePagesParams struct {
	StartAt sql.NullTime `json:"start_at"`
	EndAt   sql.NullTime `json:"end_at"`
}

func (q *Queries) GetOrdersByPayedAtRangePages(ctx context.Context, arg GetOrdersByPayedAtRangePagesParams) (int64, error) {
	row := q.db.QueryRowContext(ctx, getOrdersByPayedAtRangePages, arg.StartAt, arg.EndAt)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const getOrdersByPayedAtRangeReports = `-- name: GetOrdersByPayedAtRangeReports :one
SELECT
    SUM(payment_total_payed)::money as payment_recolected,
    SUM(payment_total_real)::money as payment_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.payed_at >= $1 AND o.payed_at <= $2 
            AND payed_at IS NULL
    ) as orders_payment_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.payed_at >= $1 AND o.payed_at <= $2 
            AND delivered_at IS NULL
    ) as orders_delivery_pending,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.payed_at >= $1 AND o.payed_at <= $2 
            AND payed_at IS NOT NULL
    ) as orders_payment_done,
    (
        SELECT
            Count(id)::VARCHAR
        FROM
            orders as o
        WHERE
            o.payed_at >= $1 AND o.payed_at <= $2 
            AND delivered_at IS NOT NULL
    ) as orders_delivery_done
FROM
    orders
WHERE  payed_at >= $1 AND payed_at <= $2
`

type GetOrdersByPayedAtRangeReportsParams struct {
	StartAt sql.NullTime `json:"start_at"`
	EndAt   sql.NullTime `json:"end_at"`
}

type GetOrdersByPayedAtRangeReportsRow struct {
	PaymentRecolected     string `json:"payment_recolected"`
	PaymentPending        string `json:"payment_pending"`
	OrdersPaymentPending  string `json:"orders_payment_pending"`
	OrdersDeliveryPending string `json:"orders_delivery_pending"`
	OrdersPaymentDone     string `json:"orders_payment_done"`
	OrdersDeliveryDone    string `json:"orders_delivery_done"`
}

func (q *Queries) GetOrdersByPayedAtRangeReports(ctx context.Context, arg GetOrdersByPayedAtRangeReportsParams) (GetOrdersByPayedAtRangeReportsRow, error) {
	row := q.db.QueryRowContext(ctx, getOrdersByPayedAtRangeReports, arg.StartAt, arg.EndAt)
	var i GetOrdersByPayedAtRangeReportsRow
	err := row.Scan(
		&i.PaymentRecolected,
		&i.PaymentPending,
		&i.OrdersPaymentPending,
		&i.OrdersDeliveryPending,
		&i.OrdersPaymentDone,
		&i.OrdersDeliveryDone,
	)
	return i, err
}

const listOrders = `-- name: ListOrders :many
SELECT
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
FROM
    orders
ORDER BY
    identifier
DESC
LIMIT
    $1 OFFSET $2
`

type ListOrdersParams struct {
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

func (q *Queries) ListOrders(ctx context.Context, arg ListOrdersParams) ([]Order, error) {
	rows, err := q.db.QueryContext(ctx, listOrders, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Order
	for rows.Next() {
		var i Order
		if err := rows.Scan(
			&i.ID,
			&i.Identifier,
			&i.RecievedDate,
			&i.DeliveryDate,
			&i.ClientName,
			&i.ClientID,
			&i.ClientAddress,
			&i.ClientPhone,
			&i.ClientEmail,
			&i.GarmentTotal,
			&i.PaymentTotalPayed,
			&i.PaymentTotal,
			&i.PaymentTotalReal,
			&i.CreatedAt,
			&i.PayedAt,
			&i.DeliveredAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listOrdersByCreatedAtRange = `-- name: ListOrdersByCreatedAtRange :many
SELECT
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
FROM
    orders
WHERE  created_at >= $1 AND created_at <= $2
ORDER BY
    created_at
DESC
LIMIT
    $4 OFFSET $3
`

type ListOrdersByCreatedAtRangeParams struct {
	StartAt   time.Time `json:"start_at"`
	EndAt     time.Time `json:"end_at"`
	OffsetArg int32     `json:"offset_arg"`
	LimitArg  int32     `json:"limit_arg"`
}

func (q *Queries) ListOrdersByCreatedAtRange(ctx context.Context, arg ListOrdersByCreatedAtRangeParams) ([]Order, error) {
	rows, err := q.db.QueryContext(ctx, listOrdersByCreatedAtRange,
		arg.StartAt,
		arg.EndAt,
		arg.OffsetArg,
		arg.LimitArg,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Order
	for rows.Next() {
		var i Order
		if err := rows.Scan(
			&i.ID,
			&i.Identifier,
			&i.RecievedDate,
			&i.DeliveryDate,
			&i.ClientName,
			&i.ClientID,
			&i.ClientAddress,
			&i.ClientPhone,
			&i.ClientEmail,
			&i.GarmentTotal,
			&i.PaymentTotalPayed,
			&i.PaymentTotal,
			&i.PaymentTotalReal,
			&i.CreatedAt,
			&i.PayedAt,
			&i.DeliveredAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listOrdersByDeliveredAtRange = `-- name: ListOrdersByDeliveredAtRange :many
SELECT
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
FROM
    orders
WHERE  delivered_at >= $1 AND delivered_at <= $2
ORDER BY
    delivered_at
DESC
LIMIT
    $4 OFFSET $3
`

type ListOrdersByDeliveredAtRangeParams struct {
	StartAt   sql.NullTime `json:"start_at"`
	EndAt     sql.NullTime `json:"end_at"`
	OffsetArg int32        `json:"offset_arg"`
	LimitArg  int32        `json:"limit_arg"`
}

func (q *Queries) ListOrdersByDeliveredAtRange(ctx context.Context, arg ListOrdersByDeliveredAtRangeParams) ([]Order, error) {
	rows, err := q.db.QueryContext(ctx, listOrdersByDeliveredAtRange,
		arg.StartAt,
		arg.EndAt,
		arg.OffsetArg,
		arg.LimitArg,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Order
	for rows.Next() {
		var i Order
		if err := rows.Scan(
			&i.ID,
			&i.Identifier,
			&i.RecievedDate,
			&i.DeliveryDate,
			&i.ClientName,
			&i.ClientID,
			&i.ClientAddress,
			&i.ClientPhone,
			&i.ClientEmail,
			&i.GarmentTotal,
			&i.PaymentTotalPayed,
			&i.PaymentTotal,
			&i.PaymentTotalReal,
			&i.CreatedAt,
			&i.PayedAt,
			&i.DeliveredAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listOrdersByPayedAtRange = `-- name: ListOrdersByPayedAtRange :many
SELECT
    id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
FROM
    orders
WHERE  payed_at >= $1 AND payed_at <= $2
ORDER BY
    payed_at
DESC
LIMIT
    $4 OFFSET $3
`

type ListOrdersByPayedAtRangeParams struct {
	StartAt   sql.NullTime `json:"start_at"`
	EndAt     sql.NullTime `json:"end_at"`
	OffsetArg int32        `json:"offset_arg"`
	LimitArg  int32        `json:"limit_arg"`
}

func (q *Queries) ListOrdersByPayedAtRange(ctx context.Context, arg ListOrdersByPayedAtRangeParams) ([]Order, error) {
	rows, err := q.db.QueryContext(ctx, listOrdersByPayedAtRange,
		arg.StartAt,
		arg.EndAt,
		arg.OffsetArg,
		arg.LimitArg,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Order
	for rows.Next() {
		var i Order
		if err := rows.Scan(
			&i.ID,
			&i.Identifier,
			&i.RecievedDate,
			&i.DeliveryDate,
			&i.ClientName,
			&i.ClientID,
			&i.ClientAddress,
			&i.ClientPhone,
			&i.ClientEmail,
			&i.GarmentTotal,
			&i.PaymentTotalPayed,
			&i.PaymentTotal,
			&i.PaymentTotalReal,
			&i.CreatedAt,
			&i.PayedAt,
			&i.DeliveredAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const setOrderDeliveredAt = `-- name: SetOrderDeliveredAt :one
UPDATE
    orders
SET
    delivered_at = $2
WHERE
    id = $1
RETURNING id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
`

type SetOrderDeliveredAtParams struct {
	ID          uuid.UUID    `json:"id"`
	DeliveredAt sql.NullTime `json:"delivered_at"`
}

func (q *Queries) SetOrderDeliveredAt(ctx context.Context, arg SetOrderDeliveredAtParams) (Order, error) {
	row := q.db.QueryRowContext(ctx, setOrderDeliveredAt, arg.ID, arg.DeliveredAt)
	var i Order
	err := row.Scan(
		&i.ID,
		&i.Identifier,
		&i.RecievedDate,
		&i.DeliveryDate,
		&i.ClientName,
		&i.ClientID,
		&i.ClientAddress,
		&i.ClientPhone,
		&i.ClientEmail,
		&i.GarmentTotal,
		&i.PaymentTotalPayed,
		&i.PaymentTotal,
		&i.PaymentTotalReal,
		&i.CreatedAt,
		&i.PayedAt,
		&i.DeliveredAt,
	)
	return i, err
}

const setOrderPayedAt = `-- name: SetOrderPayedAt :one
UPDATE
    orders
SET
    payed_at = $2,
    payment_total_real = 0,
    payment_total_payed = orders.payment_total
WHERE
    id = $1
RETURNING id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
`

type SetOrderPayedAtParams struct {
	ID      uuid.UUID    `json:"id"`
	PayedAt sql.NullTime `json:"payed_at"`
}

func (q *Queries) SetOrderPayedAt(ctx context.Context, arg SetOrderPayedAtParams) (Order, error) {
	row := q.db.QueryRowContext(ctx, setOrderPayedAt, arg.ID, arg.PayedAt)
	var i Order
	err := row.Scan(
		&i.ID,
		&i.Identifier,
		&i.RecievedDate,
		&i.DeliveryDate,
		&i.ClientName,
		&i.ClientID,
		&i.ClientAddress,
		&i.ClientPhone,
		&i.ClientEmail,
		&i.GarmentTotal,
		&i.PaymentTotalPayed,
		&i.PaymentTotal,
		&i.PaymentTotalReal,
		&i.CreatedAt,
		&i.PayedAt,
		&i.DeliveredAt,
	)
	return i, err
}

const setSequence = `-- name: SetSequence :exec
SELECT setval('orders_identifier_seq', $1, false)
`

func (q *Queries) SetSequence(ctx context.Context, setval int64) error {
	_, err := q.db.ExecContext(ctx, setSequence, setval)
	return err
}

const updateOrder = `-- name: UpdateOrder :one
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
RETURNING id, identifier, recieved_date, delivery_date, client_name, client_id, client_address, client_phone, client_email, garment_total, payment_total_payed, payment_total, payment_total_real, created_at, payed_at, delivered_at
`

type UpdateOrderParams struct {
	ID                uuid.UUID `json:"id"`
	ClientName        string    `json:"client_name"`
	ClientID          string    `json:"client_id"`
	ClientAddress     string    `json:"client_address"`
	ClientPhone       string    `json:"client_phone"`
	ClientEmail       string    `json:"client_email"`
	RecievedDate      time.Time `json:"recieved_date"`
	DeliveryDate      time.Time `json:"delivery_date"`
	GarmentTotal      string    `json:"garment_total"`
	PaymentTotalPayed string    `json:"payment_total_payed"`
	PaymentTotal      string    `json:"payment_total"`
}

func (q *Queries) UpdateOrder(ctx context.Context, arg UpdateOrderParams) (Order, error) {
	row := q.db.QueryRowContext(ctx, updateOrder,
		arg.ID,
		arg.ClientName,
		arg.ClientID,
		arg.ClientAddress,
		arg.ClientPhone,
		arg.ClientEmail,
		arg.RecievedDate,
		arg.DeliveryDate,
		arg.GarmentTotal,
		arg.PaymentTotalPayed,
		arg.PaymentTotal,
	)
	var i Order
	err := row.Scan(
		&i.ID,
		&i.Identifier,
		&i.RecievedDate,
		&i.DeliveryDate,
		&i.ClientName,
		&i.ClientID,
		&i.ClientAddress,
		&i.ClientPhone,
		&i.ClientEmail,
		&i.GarmentTotal,
		&i.PaymentTotalPayed,
		&i.PaymentTotal,
		&i.PaymentTotalReal,
		&i.CreatedAt,
		&i.PayedAt,
		&i.DeliveredAt,
	)
	return i, err
}
