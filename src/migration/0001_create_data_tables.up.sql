CREATE SCHEMA IF NOT EXISTS client;

CREATE TABLE IF NOT EXISTS client.data (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    age INTEGER NOT NULL,
    telephone TEXT,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);
