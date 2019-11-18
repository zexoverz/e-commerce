# E-COMMERCE

http://e-commerce.faisalfirdani.com/

------

  

## **1. `POST` User / Register**

  

Register new user and will returns data user and password that has been hashed.

  

-  **URL**

  

/user/register

  

-  **Method:**

  

`POST`

  

-  **URL params**

  

none

  

-  **Data Body**

  

```json

username=[string]

email=[string]

password=[string]

```

  

-  **Success Response:**

  

-  **Code:** 201

**Content:**

  

```json

{  username  :  "username",

email  :  "email",

password  :  "$2a$10$ASA5ZM/cnNoBcR/OIl1iZOczgacDPUamq3Kwrmn1C01Pw0u4.4Iqi"  }

```

  

**Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  `{ error : "username / password required" }/{ error : "username / password has been taken" }`

  

-  **Sample Input:**

  

```JSON

{

"username":  "username",

"email":  "email",

"password":  "123456"

}

```

  
  
  

## **2. `POST` User / Login**

  

Login user and will returns username, email and data Token.

  

-  **URL**

  

/user/login

  

-  **Method:**

  

`POST`

  

-  **URL params**

  

none

  

-  **Data Body**

  

```

email=[string]

password=[string]

```

  

-  **Success Response:**

  

-  **Code:** 200

**Content:**

  

```json

{

"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTY5OTgwMDE0fQ.UOxbgr1EY5sXCM1csgZIjba2vbbML-Tc-LtqDTKs5NY",

"username":  "username"

}

```

  

-  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  `{ error : "username / password wrong" }`

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

  

-  **Sample Input:**

  

```JSON

{

"email":  "email"

"password":  "123456"

}

```

  

## **3. `GET` / Product**


will Return get all Products

-  **URL**

  
/product

  -  **Method:**

  

`GET`

  

-  **URL params**

  

none

  -  **Data Body**

  

```

none

```

-  **Success Response:**

  

-  **Code:** 200

**Content:**

  

```json
[{

"_id":  "5dbe925832e04d54610991d6",

"name":  "Starwberry Butternut",

"price": 15,

"stock": 80,

"img" : "https://storage.googleapis.com/imgminiwp.faisalfirdani.com/1573714911263product1.jpeg",

"__v":  0

},


{

"_id":  "5dbeab8559c978612c2a0e12",

"name":  "Chocolate Butternut",

"price": 15,

"stock": 90,

"img" : "https://storage.googleapis.com/imgminiwp.faisalfirdani.com/1573714911263product1.jpeg"

"__v":  0

}]

```


-  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  `{ error : "Product  invalid" }`

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

  

-  **Sample Input:**

  

```JSON

{

none

}

```

  
  ## **4. `POST` / Product (ONLY ADMIN)**


will returns to create a Product

-  **URL**

  
/product

  -  **Method:**

  

`POST`

  

-  **URL params**

  

none

  -  **Data Body**

  

```

name=[string]
price=[number]
stock=[number]
img=[string]

```

-  **Success Response:  Create A Product Successfully**

  

-  **Code:** 201

**Content:**
```json
{

"_id":  "5dbecead6569f802282d3444",

"name":  "Bluberry Butternut",

"price": 25,

"__v":  0

}

```

  -  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

  

  ## **5. `PUT` / Product (ONLY ADMIN)**


will returns update some Product

-  **URL**

  
/product

  -  **Method:**


`PUT`
  

-  **URL params**

/product/:id

  -  **Data Body**
 ```
name=[string]
price=[number]
stock=[number]

```

-  **Success Response:  Update Product Successfully**

  

-  **Code:** 200

**Content:**
```json
{
"n":  1,

"nModified":  1,

"ok":  1
}

```

  -  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

-  **Sample Input:**

  

```JSON
{
"name":  "name",
"price":  "price",
"stock": 80
}
```


  ## **6. `DELETE` / Product (ONLY ADMIN)**

will returns Delete Some Product

-  **URL**

  
/product

  -  **Method:**


`DELETE`
  

-  **URL params**

/product/:id

  -  **Data Body**
 ```
none
```

-  **Success Response:  Delete Product Successfully**

  

-  **Code:** 200

**Content:**
```json
{
"n":  1,

"nModified":  1,

"ok":  1
}

```

  -  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`

-  **Sample Input:**

  

```JSON
{
"id":  "id",
}
```

 ## **7. `POST` / Transaction (ONLY USER)**


will returns to create a Transaction user

-  **URL**

  
/transaction

  -  **Method:**

  

`POST`

  

-  **URL params**

  

none

  -  **Data Body**

  

```

listProduct=[arrayOfObject]
userId=[string]
totalCost=[number]
status=[string]

```

-  **Success Response:  Create A Cart Successfully**

  

-  **Code:** 201

**Content:**
```json
{

"_id":  "5dbecead6569f802282d3444",

"listProduct":  ["objectProduct", "objectProduct", "objectProduct"],

"userId": "5dbecead656912312bnduzx22",

"totalCost": 125,

"status": "unpaid",

"__v":  0

}

```

  -  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`






 ## **8. `DELETE` / Product/ Cart (ONLY USER)**


will returns to delete a cart user

-  **URL**

  
/product/cart

  -  **Method:**

  

`DELETE`

  

-  **URL params**

  

none

  -  **Data Body**

  

```

id=[string]

```

-  **Success Response:  Delete A Cart Successfully**

  

-  **Code:** 201

**Content:**
```json
{

"id":  "5dbecead6569f802282d3444"

}

```

  -  **Error Response:**

  

-  **Code:** 400 BAD REQUEST

**Content:**  

-  **Code:** 500

**Content:**  `{ error : "Internal server error" }`





  ## **ENV**
  
```
PORT = 3000

GOOGLE_CLIENT_ID = "your google client id"

MONGO_CONNECT = "mongodb://localhost:27017/yourDatabase"

JWT_SECRET = "RedEyesDragon"

PASSWORD_USER = "DarkMagician"
```