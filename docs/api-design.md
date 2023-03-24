### Log in
* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: str
  * password: str

* Response: Account information and a token
* Response shape (JSON):
  ```json
    {
      "account": {
        "key": type,
      },
      "token": str
    }
  ```

### Log out
* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
  ```json
  true
  ```

### Sign Up
* Endpoint path: /api/accounts
* Endpoint method: POST

* Request shape (JSON):
  ```json {
      "first_name": str,
      "last_name": str,
      "email": str,
      "password": str,
      "password_validation": str,
      }
  ```

* Response: User account gets created
* Response shape (JSON):
  ```json {
    "message": str
  }
  ```

### Delete account
* Endpoint path: /api/accounts/{account_id}
* Endpoint method: DELETE
* Query parameters:
  * "account_id": get an account with that specific id, str

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json {
    "password": str,
  }
  ```

* Response: always true
* Response shape (JSON):
  ```json {
    true
    "message": str,
  }
  ```

### Create trip
* Endpoint path: /api/trips
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json
    "trip_name": str,
    "picture_url": str,
    "start_date": date,
    "end_date": date,
    "journal_entry": str,
  ```

* Response: A trip gets created
* Response shape (JSON):
  ```json
    "message": str,
  ```

### Read/list all trips
* Endpoint path: /api/trips
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Get a list of trips
* Response shape (JSON):
  ```json {
    "trip": {
    "trip_id": str,
    "trip_name": str,
    "start_date": date,
    "end_date": date,
    "journal_entry": str,
    "picture_url": str,
    "stops": [{
        "stop_id": str,
        "stop_name": str,
        "street": str,
        "state": str,
        "city": str,
        "journal_entry": str,
    },
    ]}
  }
  ```

### Read/Get a specific trip
* Endpoint path: /api/trips/{trip_id}
* Endpoint method: GET
* Query parameters:
  * trip_id: used to identify a specific trip, str

* Headers:
  * Authorization: Bearer token

* Response: Trip information is listed
* Response shape (JSON):
  ```json {
    "trip": {
    "trip_id": str,
    "trip_name": str,
    "start_date": date,
    "end_date": date,
    "journal_entry": str,
    "picture_url": str,
    "stops": [{
        "stop_id": str,
        "stop_name": str,
        "street": str,
        "state": str,
        "city": str,
        "journal_entry": str,
    },
    ]}
  }
  ```

### Delete a trip
* Endpoint path: /api/trips/{trip_id}
* Endpoint method: DELETE
* Query parameters:
  * "trip_id": str, get a specific trip to delete

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json
  null
  ```

* Response: A specified trip gets deleted
* Response shape (JSON):
  ```json {
    true,
    "message": str,
  }
  ```

### Update a trip
* Endpoint path: /api/trips/{trip_id}
* Endpoint method: PUT
* Query parameters:
  * "trip_id": str, get a specific trip to update

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json {
      "trip_name": str,
      "start_date": date,
      "end_date": date,
      "journal_entry": str,
      "picture_url": str,
    }
  ```

* Response: Updated trip info
* Response shape (JSON):
  ```json {
    "trip_name": str,
    "start_date": date,
    "end_date": date,
    "journal_entry": str,
    "picture_url": str,
  }
  ```

### Add a stop
* Endpoint path: /api/trips/{trip_id}/stops
* Endpoint method: POST
* Query parameters:
  * "trip_id": str, get a specific trip to add a stop to

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json {
      "stop_name": str,
      "street": str,
      "state": str,
      "city": str,
      "journal_entry": str,
      /* pexels entry? */
    }
  ```

* Response: Stop created
* Response shape (JSON):
  ```json {
    "stop_name": str,
    "street": str,
    "state": str,
    "city": str,
    "journal_entry": str,
    /* pexels entry? /*
  }
  ```

<!-- ### Read/List all stops for a trip
* Endpoint path: /api/trips/{trip_id}/stops
* Endpoint method: GET
* Query parameters:
  * "trip_id": str, get all the stops for a specific trip

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json
      "trip_id": int
  ```

* Response: all stops for a trip
* Response shape (JSON):
  ```json
  «JSON*looking thing that has the
  keys and types in it»
  ``` -->

### Update a stop
* Endpoint path: /api/trips/{trip_id}/stops/{stop_id}
* Endpoint method: PUT
* Query parameters:
  * "trip_id": str, get a trip to update a specific stop
  * "stop_id": str, get a specific stop to update

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json {
      "stop_name": str,
      "street": str,
      "state": str,
      "city": str,
      "journal_entry": str,
      /* pexels entry? */
      }
  ```

* Response: Updated stop info
* Response shape (JSON):
  ```json {
    "stop_name": str,
    "street": str,
    "state": str,
    "city": str,
    "journal_entry": str,
    /* pexels entry? */
  }
  ```

### Delete a stop
* Endpoint path: /api/trips/{trip_id}/stops/{stop_id}
* Endpoint method: DELETE
* Query parameters:
  * "trip_id": str, get a trip to update a specific stop
  * "stop_id": str, get a specific stop to update

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json
  null
  ```

* Response: always true
* Response shape (JSON):
  ```json {
    true,
    "message": str,
  }
  ```
