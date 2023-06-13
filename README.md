# Coderhouse ecommerce - Backend

This project is the backend of an ecommerce made with Node.js and Express. It provides an API that allows queries to be made to a products JSON file.

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

## API Reference

#### Get all products

```http
  GET /products
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `limit`   | `string` | **Optional**. Number of products to return |

#### Get product

```http
  GET /products/${pid}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `pid`     | `string` | **Required**. Id of product to fetch |
