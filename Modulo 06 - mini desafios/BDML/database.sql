 TABLE customers {
  id SERIAL [PRIMARY KEY]
  name text [NOT NULL]
  cpf int [NOT NULL]
  age int [NOT NULL]
  adress text [NOT NULL]
  orders int
}

 TABLE agencies {
  id SERIAL [PRIMARY KEY]
  adress text [UNIQUE]
  agency text [UNIQUE]
  status int [DEFAULT: "closed"]
  orders int [NOT NULL]
  created_at timestamp [DEFAULT: `now()`]
}

 TABLE addresses {
  id SERIAL [PRIMARY KEY]
  adress text [UNIQUE]
  agency text [UNIQUE]
  status int [DEFAULT: 1]
  created_at timestamp [DEFAULT: `now()`]
}

 TABLE cars {
  id SERIAL [PRIMARY KEY]
  model int [UNIQUE]
  description text [NOT NULL]
  price int [NOT NULL]
  order int
  created_at timestamp [DEFAULT: `now()`]
}

 TABLE models {
  id SERIAL [PRIMARY KEY]
  name text [NOT NULL]
  description text [NOT NULL]
  price int [NOT NULL]
  created_at timestamp [DEFAULT: `now()`]
}

 TABLE orders {
  id SERIAL [PRIMARY KEY]
  car int [UNIQUE]
  customer text [NOT NULL]
  agency text [NOT NULL]
  price int [NOT NULL]
  created_at timestamp [DEFAULT: `now()`]
  updated_at timestamp [DEFAULT: `now()`]
}

Ref: "addresses"."adress" - "agencies"."adress"

Ref: "models"."name" < "cars"."model"

Ref: "customers"."orders" < "orders"."id"

Ref: "agencies"."orders" < "orders"."id"

Ref: "cars"."id" > "orders"."car"

Ref: "orders"."id" > "cars"."id"