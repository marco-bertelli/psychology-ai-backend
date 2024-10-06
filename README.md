<a name="top"></a>
# psycology-ai-backend v0.0.1



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Register an user](#register-an-user)
	- [Renew JWT](#renew-jwt)
	
- [CommonSchemas](#commonschemas)
	- [](#)
	
- [Personality](#personality)
	- [Create Personality](#create-personality)
	- [Delete Personality](#delete-personality)
	- [Retrieve Personality](#retrieve-personality)
	- [List personalities](#list-personalities)
	- [Update Personality](#update-personality)
	
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




# <a name='personality'></a> Personality

## <a name='create-personality'></a> Create Personality
[Back to top](#top)



	POST /personalities






### Success 201

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Personality | Personality | <p>Personality's data.</p>|

## <a name='delete-personality'></a> Delete Personality
[Back to top](#top)



	DELETE /personalities/:id






### Success 204

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  204 |  | <p>No Content.</p>|

## <a name='retrieve-personality'></a> Retrieve Personality
[Back to top](#top)



	GET /personalities/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Personality | Personality | <p>Personality's data.</p>|

## <a name='list-personalities'></a> List personalities
[Back to top](#top)



	GET /personalities





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
|  personalities | Personality[] | <p>List of personalities.</p>|

## <a name='update-personality'></a> Update Personality
[Back to top](#top)



	PUT /personalities/:id






### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
|  Personality | Object | <p>Personality's data.</p>|

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

