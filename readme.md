### Troo Backend

```

To create super admin

localhost:4000/api/auth/create - POST

body: {
  "fullname": "Ademide",
  "password": "ladygaga",
  "email": "tyler1@mil.com",
  "company": "Processor"
}

```

```
Login for all users

localhost:4000/api/auth/login - POST

body: {
  "email": "tyler1@mil.com",
  "password": "ladygaga"
}

```

```

Add users as a Super admin

localhost:4000/api/users/add -POST
{
  "fullname": "olamide",
  "email": "tyoer@sm.com",
  "type": "basic_user"
}
Bearer token is Required for this route, get a token from login route

```

```
localhost:4000/api/users/assign-roles
{
  "userid": 1,
  "roleid": 1
}

Bearer token is Required

```

### Roles and Permission api

```
To add Permissions to role
localhost:4000/api/role/add-permission POST

{
  "roleid": 1,
  "permissions": [1,2]
}
```

```
To create Permissions
localhost:4000/api/permission - POST

{
  "name": "delete-user"
}
```
```

Fetch Role By ID
localhost:4000/api/role - GET

{
  "id": 1
}
```

```
Create Role
localhost:4000/api/role/create - POST

{
  "name": "admin"
}


```

## Database relationship

![image](https://github.com/tylerjusfly/troo-backend/assets/53145644/35f7f0ec-13b5-4f79-9cd8-65c92f37d3d8)



### Many to Many through a junction table

![image](https://github.com/tylerjusfly/troo-backend/assets/53145644/a6c9e1e7-9bae-4c28-b9f6-5869864326dc)

