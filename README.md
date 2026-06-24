# Recipes API

A RESTful CRUD API for managing recipes, built with Node.js, Express, TypeScript, and MySQL. Deployed on Railway.

## Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript (strict mode)
- **Database:** MySQL (mysql2 promise pool)
- **Deployment:** Railway

## Project Structure

```
src/
├── config/
│   └── db.ts                  # mysql2 connection pool
├── routes/
│   └── recipes.ts             # route definitions
├── controllers/
│   └── recipesController.ts   # request handling & validation
├── services/
│   └── recipesService.ts      # SQL queries
├── types/
│   └── recipe.ts              # TypeScript interfaces
└── app.ts                     # Express setup, middleware, 404 handler
index.ts                       # entry point
```

## Endpoints

All endpoints return HTTP `200`. Unmatched routes return `404`.

### `POST /recipes`

Create a new recipe.

**Body:** `title`, `making_time`, `serves`, `ingredients`, `cost` (all required)

**Success:**
```json
{
  "message": "Recipe successfully created!",
  "recipe": [{ "id": 3, "title": "Tomato Soup", "making_time": "15 min", "serves": "5 people", "ingredients": "onion, tomato, seasoning, water", "cost": "450", "created_at": "2016-01-12 14:10:12", "updated_at": "2016-01-12 14:10:12" }]
}
```

**Missing fields:**
```json
{ "message": "Recipe creation failed!", "required": "title, making_time, serves, ingredients, cost" }
```

---

### `GET /recipes`

Return all recipes.

```json
{ "recipes": [{ "id": 1, "title": "Chicken Curry", "making_time": "45 min", "serves": "4 people", "ingredients": "onion, chicken, seasoning", "cost": "1000" }] }
```

---

### `GET /recipes/:id`

Return a single recipe by ID.

**Found:**
```json
{ "message": "Recipe details by id", "recipe": [{ "id": 1, "title": "Chicken Curry", ... }] }
```

**Not found:**
```json
{ "message": "Recipe not found" }
```

---

### `PATCH /recipes/:id`

Update a recipe. Accepts any subset of `title`, `making_time`, `serves`, `ingredients`, `cost`.

**Updated:**
```json
{ "message": "Recipe successfully updated!", "recipe": [{ "title": "Tomato Soup", "making_time": "15 min", "serves": "5 people", "ingredients": "onion, tomato, seasoning, water", "cost": "450" }] }
```

**Not found:**
```json
{ "message": "Recipe not found" }
```

---

### `DELETE /recipes/:id`

Delete a recipe by ID.

**Deleted:**
```json
{ "message": "Recipe successfully removed!" }
```

**Not found:**
```json
{ "message": "No recipe found" }
```

---

## Local Development

### Prerequisites

- Node.js
- MySQL running locally with a `recipes` database

### Setup

```bash
npm install
```

Create a `.env` file at the project root:

```
MYSQLHOST=127.0.0.1
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=your_password
MYSQLDATABASE=recipes
PORT=3000
```

Initialize the database by running the SQL in `db-scripts.sql` against your local MySQL instance.

### Run

```bash
# Development (ts-node, no build step)
npm run dev

# Production build
npm run build
npm start
```