<a name="top"></a>
# caf v0.0.1



- [Article](#article)
	- [Create Article](#create-article)
	- [Delete Article](#delete-article)
	- [Retrieve Article](#retrieve-article)
	- [List articles](#list-articles)
	- [Update Article](#update-article)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Register an user](#register-an-user)
	- [Renew JWT](#renew-jwt)
	
- [Client](#client)
	- [Create Client](#create-client)
	- [Delete Client](#delete-client)
	- [Retrieve Client](#retrieve-client)
	- [List clients](#list-clients)
	- [Update Client](#update-client)
	
- [CommonSchemas](#commonschemas)
	- [](#)
	
- [Recepit](#recepit)
	- [Create Recepit](#create-recepit)
	- [Delete Recepit](#delete-recepit)
	- [generate recepit pdf from groups](#generate-recepit-pdf-from-groups)
	- [Retrieve Recepit](#retrieve-recepit)
	- [List recepits](#list-recepits)
	- [Update Recepit](#update-recepit)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Delete current user](#delete-current-user)
	- [Retrieve user](#retrieve-user)
	- [List users](#list-users)
	- [Retrieve current user](#retrieve-current-user)
	- [Update user](#update-user)
	- [Update password](#update-password)
	- [Reset other users password](#reset-other-users-password)
	


# <a name='article'></a> Article

## <a name='create-article'></a> Create Article
[Back to top](#top)



	POST /articles






### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Article | Article | <p>Article's data.</p>|

## <a name='delete-article'></a> Delete Article
[Back to top](#top)



	DELETE /articles/:id






### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='retrieve-article'></a> Retrieve Article
[Back to top](#top)



	GET /articles/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Article | Article | <p>Article's data.</p>|

## <a name='list-articles'></a> List articles
[Back to top](#top)



	GET /articles





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  page | Number | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br>|
|  limit | Number | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br>|
|  sort | String[] | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br>|
|  fields | String[] | **optional**<p>Fields to be returned.</p>|
|  singleFieldValue | String[fieldName] | **optional**<p>filter by element value.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  articles | Article[] | <p>List of articles.</p>|

## <a name='update-article'></a> Update Article
[Back to top](#top)



	PUT /articles/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Article | Object | <p>Article's data.</p>|

# <a name='auth'></a> Auth

## <a name='authenticate'></a> Authenticate
[Back to top](#top)



	POST /auth






### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  token | String | <p>User <code>access_token</code> to be passed to other requests.</p>|
|  user | User | <p>Current user's data.</p>|

## <a name='register-an-user'></a> Register an user
[Back to top](#top)



	POST /auth/register





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>Master access_token.</p>|



### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | User | <p>User's data.</p>|

## <a name='renew-jwt'></a> Renew JWT
[Back to top](#top)



	GET /auth/renewJWT





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  access_token | String | <p>access_token.</p>|



### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  token | String | <p>User <code>access_token</code> to be passed to other requests.</p>|
|  user | User | <p>Current user's data.</p>|

# <a name='client'></a> Client

## <a name='create-client'></a> Create Client
[Back to top](#top)



	POST /clients






### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Client | Client | <p>Client's data.</p>|

## <a name='delete-client'></a> Delete Client
[Back to top](#top)



	DELETE /clients/:id






### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='retrieve-client'></a> Retrieve Client
[Back to top](#top)



	GET /clients/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Client | Client | <p>Client's data.</p>|

## <a name='list-clients'></a> List clients
[Back to top](#top)



	GET /clients





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  page | Number | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br>|
|  limit | Number | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br>|
|  sort | String[] | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br>|
|  fields | String[] | **optional**<p>Fields to be returned.</p>|
|  singleFieldValue | String[fieldName] | **optional**<p>filter by element value.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  clients | Client[] | <p>List of clients.</p>|

## <a name='update-client'></a> Update Client
[Back to top](#top)



	PUT /clients/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Client | Object | <p>Client's data.</p>|

# <a name='commonschemas'></a> CommonSchemas

## <a name=''></a> 
[Back to top](#top)



	JS personalInfoSchema



### Examples

Entity schema: */

```
  {
    streetName: {
      type: String
    },
    zipCode: {
      type: String
    },
    city: {
      type: String
    },
    province: {
      type: String
    },
    region: {
      type: String
    },
    state: {
      type: String
    },
    vatNumber: {
      type: String
    },
    telephone: {
      type: String
    }
  };
/*
```




# <a name='recepit'></a> Recepit

## <a name='create-recepit'></a> Create Recepit
[Back to top](#top)



	POST /recepits






### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Recepit | Recepit | <p>Recepit's data.</p>|

## <a name='delete-recepit'></a> Delete Recepit
[Back to top](#top)



	DELETE /recepits/:id






### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='generate-recepit-pdf-from-groups'></a> generate recepit pdf from groups
[Back to top](#top)



	POST /recepits/:id/pdf






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Recepit | Object | <p>Recepit's data.</p>|

## <a name='retrieve-recepit'></a> Retrieve Recepit
[Back to top](#top)



	GET /recepits/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Recepit | Recepit | <p>Recepit's data.</p>|

## <a name='list-recepits'></a> List recepits
[Back to top](#top)



	GET /recepits





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  page | Number | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br>|
|  limit | Number | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br>|
|  sort | String[] | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br>|
|  fields | String[] | **optional**<p>Fields to be returned.</p>|
|  singleFieldValue | String[fieldName] | **optional**<p>filter by element value.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  recepits | Recepit[] | <p>List of recepits.</p>|

## <a name='update-recepit'></a> Update Recepit
[Back to top](#top)



	PUT /recepits/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Recepit | Object | <p>Recepit's data.</p>|

# <a name='user'></a> User

## <a name='create-user'></a> Create user
[Back to top](#top)



	POST /users






### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | User | <p>User's data.</p>|

## <a name='delete-user'></a> Delete user
[Back to top](#top)



	DELETE /users/:id






### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='delete-current-user'></a> Delete current user
[Back to top](#top)



	DELETE /users/me






### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='retrieve-user'></a> Retrieve user
[Back to top](#top)



	GET /users/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | User | <p>User's data.</p>|

## <a name='list-users'></a> List users
[Back to top](#top)



	GET /users





### Parameter Parameters

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  page | Number | **optional**<p>Page number.</p>_Default value: 1_<br>_Size range: 1..30_<br>|
|  limit | Number | **optional**<p>Amount of returned items.</p>_Default value: 30_<br>_Size range: 1..100_<br>|
|  sort | String[] | **optional**<p>Order of returned items.</p>_Default value: -createdAt_<br>|
|  fields | String[] | **optional**<p>Fields to be returned.</p>|
|  singleFieldValue | String[fieldName] | **optional**<p>filter by element value.</p>|



### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  users | User[] | <p>List of users.</p>|

## <a name='retrieve-current-user'></a> Retrieve current user
[Back to top](#top)



	GET /users/me






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | User | <p>User's data.</p>|

## <a name='update-user'></a> Update user
[Back to top](#top)



	PUT /users/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | Object | <p>User's data.</p>|

## <a name='update-password'></a> Update password
[Back to top](#top)



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization | String | <p>Basic authorization with email and password.</p>|





### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | User | <p>User's data.</p>|

## <a name='reset-other-users-password'></a> Reset other users password
[Back to top](#top)



	PUT /users/:id/passwordReset






### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  user | Object | <p>User's data.</p>|

