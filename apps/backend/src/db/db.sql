CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64),
  email VARCHAR(64) UNIQUE,
  telephone VARCHAR(32),
  coordinate_x INT,
  coordinate_y INT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP		
);

-- seed
INSERT INTO customers (name, email, telephone, coordinate_x, coordinate_y) VALUES
  ('João', 'joao@email.com', '+55 99 98765-4321', 10, 20),
  ('Maria', 'maria@email.com', '+55 99 12345-6789', 30, 40),
  ('José', 'jose@email.com', '+55 99 55555-5555', 50, 60),
  ('Ana', 'ana@email.com', '+55 99 99999-9999', 70, 80),
  ('Carlos', 'carlos@email.com', '+55 99 77777-7777', 90, 100),
  ('Fernanda', 'fernanda@email.com', '+55 99 33333-3333', 110, 120),
  ('Pedro', 'pedro@email.com', '+55 99 22222-2222', 130, 140),
  ('Camila', 'camila@email.com', '+55 99 44444-4444', 150, 160),
  ('Rafael', 'rafael@email.com', '+55 99 66666-6666', 170, 180),
  ('Laura', 'laura@email.com', '+55 99 88888-8888', 190, 200),
  ('Mariana', 'mariana@email.com', '+55 99 00000-0000', 210, 220),
  ('Lucas', 'lucas@email.com', '+55 99 12121-2121', 230, 240),
  ('Giovanna', 'giovanna@email.com', '+55 99 23232-3232', 250, 260),
  ('Gabriel', 'gabriel@email.com', '+55 99 34343-4343', 270, 280),
  ('Amanda', 'amanda@email.com', '+55 99 45454-5454', 290, 300),
  ('Felipe', 'felipe@email.com', '+55 99 56565-6565', 310, 320),
  ('Isabela', 'isabela@email.com', '+55 99 67676-7676', 330, 340),
  ('Luiza', 'luiza@email.com', '+55 99 78787-8787', 350, 360),
  ('Matheus', 'matheus@email.com', '+55 99 89898-9898', 370, 380),
  ('Juliana', 'juliana@email.com', '+55 99 90909-0909', 390, 400),
  ('Diego', 'diego@email.com', '+55 99 11111-1111', 410, 420),
  ('Carolina', 'carolina@email.com', '+55 99 22222-2222', 430, 440),
  ('Roberto', 'roberto@email.com', '+55 99 33333-3333', 450, 460),
  ('Fernando', 'fernando@email.com', '+55 99 44444-4444', 470, 480),
  ('Marta', 'marta@email.com', '+55 99 55555-5555', 490, 500);