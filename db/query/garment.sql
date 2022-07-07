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
        service_type,
        price_total
    )
VALUES
    (
        @id,
        @order_id,
        @cuantity :: numeric,
        @category,
        @gendre,
        @color,
        @brand,
        @price :: varchar,
        @comment,
        @defects,
        @service_type,
        ((@price) :: numeric * (@cuantity)) :: money
    ) RETURNING *;

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
    id = $1 RETURNING *;

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
DELETE FROM
    orders
WHERE
    id = $1;

-- name: SumaryGarments :many
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
                    AND g1.created_at >= @start_at
                    AND g1.created_at <= @end_at
                GROUP BY
                    g1.service_type,
                    g1.category,
                    g1.price
            ) as a
    ) :: money as price_total,
    (
        SELECT
            CASE
                WHEN g.service_type = 'Lavado' THEN p.cost_washing :: INT * SUM(g.cuantity)
                WHEN g.service_type = 'Planchado' THEN p.cost_ironing :: INT * SUM(g.cuantity)
                WHEN g.service_type = 'Tinturado' THEN p.cost_dyeing :: INT * SUM(g.cuantity)
                ELSE 0
            END
    ) :: money as cost_total,
    (
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
                        AND g1.created_at >= @start_at
                        AND g1.created_at <= @end_at
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
        ) :: INT
    ) :: money utilities
FROM
    garments as g
    INNER JOIN prices as p ON g.category = p.category
WHERE
    g.created_at >= @start_at
    AND g.created_at <= @end_at
GROUP BY
    g.service_type,
    g.category,
    p.cost_dyeing,
    p.cost_washing,
    p.cost_ironing
ORDER BY
    g.category;

-- name: SumaryGarmentsResults :one
SELECT
    COALESCE(SUM(x.total), 0):: INT as total_garments,
    COALESCE(SUM(x.price_total), '0') :: money as total_price_total,
    COALESCE(SUM(x.cost_total), '0') :: money as total_cost,
    COALESCE(SUM(x.utilities), '0') :: money as total_utilities
FROM
    (
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
                            AND g1.created_at >= @start_at
                            AND g1.created_at <= @end_at
                        GROUP BY
                            g1.service_type,
                            g1.category,
                            g1.price
                    ) as a
            ) :: money as price_total,
            (
                SELECT
                    CASE
                        WHEN g.service_type = 'Lavado' THEN p.cost_washing :: INT * SUM(g.cuantity)
                        WHEN g.service_type = 'Planchado' THEN p.cost_ironing :: INT * SUM(g.cuantity)
                        WHEN g.service_type = 'Tinturado' THEN p.cost_dyeing :: INT * SUM(g.cuantity)
                        ELSE 0
                    END
            ) :: money as cost_total,
            (
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
                                AND g1.created_at >= @start_at
                                AND g1.created_at <= @end_at
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
                ) :: INT
            ) :: money utilities
        FROM
            garments as g
            INNER JOIN prices as p ON g.category = p.category
        WHERE
            g.created_at >= @start_at
            AND g.created_at <= @end_at
        GROUP BY
            g.service_type,
            g.category,
            p.cost_dyeing,
            p.cost_washing,
            p.cost_ironing
        ORDER BY
            g.category
    ) as x;