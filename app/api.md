## API Documentation

## Stocks

### Get all stocks

Return all the stocks.

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/stocks
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

   ```json
    {
      [
        {
            "id": 1,
            "name": "Tesla",
            "symbol": "TSLA"
            "price": 190.0,
            "ceo": "Elon Reeve Musk",
            "founded": 2003,
            "employees": 99290,
            "headquarter": "Austin, Texas",
            "description": "Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles and energy generation and storage systems. It also provides vehicle service centers, Supercharger stations, and self-driving capability.",
        }
      ]
    }
    ```

### Get details of a Stock from an id

Returns the details of a stock specified by its id

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/stocks/:stock_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
        {
            "id": 1,
            "name": "Tesla",
            "symbol": "TSLA"
            "price": 190.0,
            "ceo": "Elon Reeve Musk",
            "founded": 2003,
            "employees": 99290,
            "headquarter": "Austin, Texas",
            "description": "Tesla, Inc. engages in the design, development, manufacture, and sale of fully electric vehicles and energy generation and storage systems. It also provides vehicle service centers, Supercharger stations, and self-driving capability.",
        }
    ```

* Error response: Couldn't find a Stock with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Stock couldn't be found",
      "statusCode": 404
    }
    ```

## Watchlists

### Get all Watchlists by User ID

Returns all the watchlists of the current user

* Require Authentication: True
* Request
  * Method: GET
  * URL: /api/watchlists/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
        {
            [
                {
                    "id": 1,
                    "name": "SP500",
                    "user_id": 1,
                    "watched_stocks": {
                    "1": {
                        "id": 1,
                        "price": 190.0,
                        "symbol": "TSLA"
                    },
                    "2": {
                        "id": 2,
                        "price": 149.0,
                        "symbol": "APPL"
                    },
                    "3": {
                        "id": 3,
                        "price": 96.0,
                        "symbol": "GOOGL"
                    }
                    }
                }
            ]
        }

### Create a new watchlist

Create a new watchlist

* Require Authentication: True
* Request
  * Method: POST
  * URL: /api/users/:user_id/watchlists
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "My new list"
    }

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "name": "My new list"
    }
    ```
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "name": "Name of watchlist is required"
      }
    }
    ```

### Update a Watchlist
Updates and returns an existing watchlist.
* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: PUT
  * URL: /api/spots/:spotId
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
      ```json
      {
        "message": "Watchlist not found",
        "statusCode": 404,
      }

      ```
### Delete a Watchlist
Deletes an existing watchlist.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/watchlists/:watchlist_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "successfully delete watchlist",
      "statusCode": 200
    }
    ```

### Add stock to watchlist
Add a stock to an existing watchlist
* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/watchlists/add
  * Body: none
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json

### Remove a stock from watchlist
Remove a stock from an existing watchlist
* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Stock deleted from watchlist",
      "statusCode": 200
    }
    ```

## Stocks

### Get all stocks
* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/stocks
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json

    ```
### Get details of a Stock from an id

Returns the details of a stock specified by its id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/stocks/:stockId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
      ```json

    ```

* Error response: Couldn't find a Stock with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Stock couldn't be found",
      "statusCode": 404
    }
    ```

## Transactions

## Get all Transactions by User Id

Returns all the transactions of user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/users/:userId/transactions
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
    ```json

    ```

## Create a transaction

Create and return a new transaction
* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/users/:userId/transactions
  * Headers:
    * Content-Type: application/json
  * Body:
      ```json
      {
        "stock_symbol": "BA",
        "quantity": 1,
        "is_purchased": true,
        "price": 89
      }

      ```
* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:
      ```json

      ```
