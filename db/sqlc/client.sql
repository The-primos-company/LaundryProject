--name: createClient :one
INSERT INTO clients (
    id,
    name,
    phone,
    address,    
) VALUES (
    $1, $2, $3, $4
) RETURNING *;