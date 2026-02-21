-- Vehicle Registry
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  license_plate TEXT UNIQUE NOT NULL,
  max_capacity_kg NUMERIC NOT NULL,
  odometer INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Available' CHECK (status IN ('Available', 'On Trip', 'In Shop', 'Retired')),
  acquisition_cost NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Driver Performance & Safety
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  license_expiry DATE NOT NULL,
  safety_score INTEGER DEFAULT 100,
  status TEXT DEFAULT 'On Duty' CHECK (status IN ('On Duty', 'Off Duty', 'Suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trip Dispatcher & Management
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id),
  driver_id UUID REFERENCES drivers(id),
  cargo_weight_kg NUMERIC NOT NULL,
  status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Dispatched', 'Completed', 'Cancelled')),
  start_odometer INTEGER,
  end_odometer INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expense & Fuel Logging
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id),
  type TEXT CHECK (type IN ('Fuel', 'Maintenance')),
  amount NUMERIC NOT NULL,
  description TEXT,
  date DATE DEFAULT CURRENT_DATE
);