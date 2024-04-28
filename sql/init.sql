-- init.sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS customers (
    customer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(500) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    annual_income DECIMAL(10, 2) NOT NULL,
    registration_date DATE NOT NULL,
    purchase_type VARCHAR(100) NOT NULL,
    url_temp VARCHAR(255) NOT NULL
);
