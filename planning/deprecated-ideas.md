#### POST /api/authenticate

Call to authenticate the user (?Dima: user presses login -> (a) they do not have an ethereum address(b) they have ethereum address

(a) check this in React, if does not have, then prompt them to create one

(b) we send a call to authenticate with their ethereum address, containing the following:

**Request Format**

```json
{
  "userEthAddr": "0xaa2212999b2321"
}
```

? anything else (timestamp and unique id i'll make on the backend)

**Response Format**

```json
{
  "userId": "base64encodedstring",
}
```

^ that string is stored in redis cache, and it maps the `userId` to the ethereum address, which is a primary key in our user table

whenever the user makes a subsequent request, we check that this id has not expired yet, if it has, we send back the `401` http code that means that the re-authentication is required. They re-login, and we send them back a new `userId`.
