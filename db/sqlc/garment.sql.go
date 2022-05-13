// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.13.0
// source: garment.sql

package db

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const createGarment = `-- name: CreateGarment :one
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
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id, order_id, cuantity, category, gendre, color, brand, price, comment, defects, created_at, service_type
`

type CreateGarmentParams struct {
	ID          uuid.UUID `json:"id"`
	OrderID     uuid.UUID `json:"order_id"`
	Cuantity    string    `json:"cuantity"`
	Category    string    `json:"category"`
	Gendre      string    `json:"gendre"`
	Color       string    `json:"color"`
	Brand       string    `json:"brand"`
	Price       string    `json:"price"`
	Comment     string    `json:"comment"`
	Defects     string    `json:"defects"`
	ServiceType string    `json:"service_type"`
}

func (q *Queries) CreateGarment(ctx context.Context, arg CreateGarmentParams) (Garment, error) {
	row := q.db.QueryRowContext(ctx, createGarment,
		arg.ID,
		arg.OrderID,
		arg.Cuantity,
		arg.Category,
		arg.Gendre,
		arg.Color,
		arg.Brand,
		arg.Price,
		arg.Comment,
		arg.Defects,
		arg.ServiceType,
	)
	var i Garment
	err := row.Scan(
		&i.ID,
		&i.OrderID,
		&i.Cuantity,
		&i.Category,
		&i.Gendre,
		&i.Color,
		&i.Brand,
		&i.Price,
		&i.Comment,
		&i.Defects,
		&i.CreatedAt,
		&i.ServiceType,
	)
	return i, err
}

const deleteGarment = `-- name: DeleteGarment :exec
DELETE
FROM
    orders
WHERE id = $1
`

func (q *Queries) DeleteGarment(ctx context.Context, id uuid.UUID) error {
	_, err := q.db.ExecContext(ctx, deleteGarment, id)
	return err
}

const getGarment = `-- name: GetGarment :one
SELECT
    id, order_id, cuantity, category, gendre, color, brand, price, comment, defects, created_at, service_type
FROM
    garments
WHERE
    id = $1
LIMIT
    1
`

func (q *Queries) GetGarment(ctx context.Context, id uuid.UUID) (Garment, error) {
	row := q.db.QueryRowContext(ctx, getGarment, id)
	var i Garment
	err := row.Scan(
		&i.ID,
		&i.OrderID,
		&i.Cuantity,
		&i.Category,
		&i.Gendre,
		&i.Color,
		&i.Brand,
		&i.Price,
		&i.Comment,
		&i.Defects,
		&i.CreatedAt,
		&i.ServiceType,
	)
	return i, err
}

const listGarmentsByOrder = `-- name: ListGarmentsByOrder :many
SELECT
    id, order_id, cuantity, category, gendre, color, brand, price, comment, defects, created_at, service_type
FROM
    garments
WHERE 
    order_id = $1
ORDER BY
    created_at
`

func (q *Queries) ListGarmentsByOrder(ctx context.Context, orderID uuid.UUID) ([]Garment, error) {
	rows, err := q.db.QueryContext(ctx, listGarmentsByOrder, orderID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Garment
	for rows.Next() {
		var i Garment
		if err := rows.Scan(
			&i.ID,
			&i.OrderID,
			&i.Cuantity,
			&i.Category,
			&i.Gendre,
			&i.Color,
			&i.Brand,
			&i.Price,
			&i.Comment,
			&i.Defects,
			&i.CreatedAt,
			&i.ServiceType,
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

const sumaryGarments = `-- name: SumaryGarments :many
SELECT
    SUM(cuantity) as total,
    g.category,
    g.service_type,
    (
        SELECT
            SUM(a.price_total)
        FROM
            (
                SELECT
                    g1.price :: int * SUM(g1.cuantity) as price_total
                FROM
                    garments as g1
                WHERE
                    g1.category = g.category
                    and g1.service_type = g.service_type
                    AND g1.created_at >= $1
                    AND g1.created_at <= $2
                GROUP BY
                    g1.service_type,
                    g1.category,
                    g1.price
            ) as a
    )  ::money as price_total,
        (
        SELECT
            CASE
                WHEN g.service_type = 'Lavado' THEN p.cost_washing :: INT * SUM(g.cuantity)
                WHEN g.service_type = 'Planchado' THEN p.cost_ironing :: INT * SUM(g.cuantity)
                WHEN g.service_type = 'Tinturado' THEN p.cost_dyeing :: INT * SUM(g.cuantity)
                ELSE 0
            END
    ) ::money as cost_total,
    ((
        SELECT
            SUM(a.price_total)
        FROM
            (
                SELECT
                    g1.price :: int * SUM(g1.cuantity) as price_total
                FROM
                    garments as g1
                WHERE
                    g1.category = g.category
                    and g1.service_type = g.service_type
                    AND g1.created_at >= $1
                    AND g1.created_at <= $2
                GROUP BY
                    g1.service_type,
                    g1.category,
                    g1.price
            ) as a
    ) - (
        SELECT
            CASE
                WHEN g.service_type = 'Lavado' THEN p.cost_washing :: INT * SUM(g.cuantity)
                WHEN g.service_type = 'Planchado' THEN p.cost_ironing :: INT * SUM(g.cuantity)
                WHEN g.service_type = 'Tinturado' THEN p.cost_dyeing :: INT * SUM(g.cuantity)
                ELSE 0
            END
    )::INT) ::money utilities
FROM
    garments as g
    INNER JOIN prices as p ON g.category = p.category
WHERE
    g.created_at >= $1
    AND g.created_at <= $2
GROUP BY
    g.service_type,
    g.category,
    p.cost_dyeing,
    p.cost_washing,
    p.cost_ironing
ORDER BY
    g.category
`

type SumaryGarmentsParams struct {
	StartAt time.Time `json:"start_at"`
	EndAt   time.Time `json:"end_at"`
}

type SumaryGarmentsRow struct {
	Total       int64  `json:"total"`
	Category    string `json:"category"`
	ServiceType string `json:"service_type"`
	PriceTotal  string `json:"price_total"`
	CostTotal   string `json:"cost_total"`
	Utilities   string `json:"utilities"`
}

func (q *Queries) SumaryGarments(ctx context.Context, arg SumaryGarmentsParams) ([]SumaryGarmentsRow, error) {
	rows, err := q.db.QueryContext(ctx, sumaryGarments, arg.StartAt, arg.EndAt)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []SumaryGarmentsRow
	for rows.Next() {
		var i SumaryGarmentsRow
		if err := rows.Scan(
			&i.Total,
			&i.Category,
			&i.ServiceType,
			&i.PriceTotal,
			&i.CostTotal,
			&i.Utilities,
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

const updateGarment = `-- name: UpdateGarment :one
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
RETURNING id, order_id, cuantity, category, gendre, color, brand, price, comment, defects, created_at, service_type
`

type UpdateGarmentParams struct {
	ID          uuid.UUID `json:"id"`
	Cuantity    string    `json:"cuantity"`
	Category    string    `json:"category"`
	Gendre      string    `json:"gendre"`
	Color       string    `json:"color"`
	Brand       string    `json:"brand"`
	Price       string    `json:"price"`
	Comment     string    `json:"comment"`
	Defects     string    `json:"defects"`
	ServiceType string    `json:"service_type"`
}

func (q *Queries) UpdateGarment(ctx context.Context, arg UpdateGarmentParams) (Garment, error) {
	row := q.db.QueryRowContext(ctx, updateGarment,
		arg.ID,
		arg.Cuantity,
		arg.Category,
		arg.Gendre,
		arg.Color,
		arg.Brand,
		arg.Price,
		arg.Comment,
		arg.Defects,
		arg.ServiceType,
	)
	var i Garment
	err := row.Scan(
		&i.ID,
		&i.OrderID,
		&i.Cuantity,
		&i.Category,
		&i.Gendre,
		&i.Color,
		&i.Brand,
		&i.Price,
		&i.Comment,
		&i.Defects,
		&i.CreatedAt,
		&i.ServiceType,
	)
	return i, err
}
