-- Puja Look Database Schema (Supabase / PostgreSQL)
-- Store ethnic & festive boutique shopping assistant tables

-- 1. Shops Table
CREATE TABLE IF NOT EXISTS shops (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  logo_url TEXT,
  primary_language TEXT DEFAULT 'bn',
  tagline TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  shop_id TEXT NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_bn TEXT,
  description TEXT NOT NULL,
  description_bn TEXT,
  category TEXT NOT NULL, -- 'Sarees', 'Kurtas', 'Kurta sets', 'Dresses', 'Shirts'
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  sizes TEXT[] NOT NULL DEFAULT '{}',
  colours TEXT[] NOT NULL DEFAULT '{}',
  occasions TEXT[] NOT NULL DEFAULT '{}',
  styles TEXT[] NOT NULL DEFAULT '{}',
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id TEXT PRIMARY KEY,
  shop_id TEXT NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  selected_size TEXT NOT NULL,
  selected_colour TEXT NOT NULL,
  final_price NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'Collected', 'Cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  shop_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_products_shop ON products(shop_id);
CREATE INDEX IF NOT EXISTS idx_products_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_reservations_shop ON reservations(shop_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event_name);
