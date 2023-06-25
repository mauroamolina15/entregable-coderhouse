# Coderhouse ecommerce - Backend

This project is the backend of an ecommerce made with Node.js and Express. It provides an API that allows queries to be made to products and carts JSON files.

## Run Locally

Clone the project

```bash
  git clone https://github.com/mauroamolina15/entregable-coderhouse.git
```

Go to the project directory

```bash
  cd entregable-coderhouse
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

El servidor se ejecutará en http://localhost:8080.

# API Reference

## Products

### GET /

```http
  GET /products
  GET /products?limit=5
```

- Description: Get a list of products.
- Parameters:
  - `limit` (optional): Limits the number of products returned.
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "results": 2,
      "data": [
        {
          "id": 1,
          "title": "Product 1",
          "description": "Description of product 1",
          "price": 10.99
        },
        {
          "id": 2,
          "title": "Product 2",
          "description": "Description of product 2",
          "price": 19.99
        }
      ]
    }
    ```

### GET /:pid

```http
  GET /products/1
```

- Description: Get a specific product by ID.
- Parameters:
  - `pid`: The product ID.
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "data": {
        "id": 1,
        "title": "Product 1",
        "description": "Description of product 1",
        "price": 10.99
      }
    }
    ```

### POST /

```http
  POST /products
```

- Description: Create a new product.
- Request Body:
  - JSON object representing the product.
- Response:
  - Status: 201 Created
  - Body:
    ```json
    {
      "msg": "Product created successfully"
    }
    ```

### PUT /:pid

```http
  PUT /products/1
```

- Description: Update an existing product by ID.
- Parameters:
  - `pid`: The product ID.
- Request Body:
  - JSON object representing the updated fields of the product.
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "msg": "Product with id 1 updated successfully"
    }
    ```

### DELETE /:pid

```http
  DELETE /products/1
```

- Description: Delete a product by ID.
- Parameters:
  - `pid`: The product ID.
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "msg": "Product with id 1 deleted successfully"
    }
    ```

## Carts

### POST /

```http
  POST /carts
```

- Description: Create a new cart.
- Response:
  - Status: 201 Created
  - Body:
    ```json
    {
      "msg": "Cart created successfully"
    }
    ```

### GET /:cid

```http
  GET /carts/1
```

- Description: Get products from a specific cart by ID.
- Parameters:
  - `cid`: The cart ID.
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "results": 2,
      "products": [
        {
          "id": 1,
          "title": "Product 1",
          "description": "Description of product 1",
          "price": 10.99
        },
        {
          "id": 2,
          "title": "Product 2",
          "description": "Description of product 2",
          "price": 19.99
        }
      ]
    }
    ```

### POST /:cid/product/:pid

```http
  POST /carts/1/product/1
```

- Description: Add a product to a specific cart.
- Parameters:
  - `cid`: The cart ID.
  - `pid`: The product ID.
- Response:
  - Status: 200 OK
  - Body:
    ```json
    {
      "msg": "Product with id 1 added successfully"
    }
    ```
