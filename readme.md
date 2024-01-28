### Troo Backend

## Database ERD

![image](https://github.com/tylerjusfly/troo-backend/assets/53145644/a6c9e1e7-9bae-4c28-b9f6-5869864326dc)

This Image above depict a one to many relationship between the user and role, and also a many to many relationship 
between roles and permission using a junction table


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
localhost:4000/api/users/profile

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

` Note: to view roles you have to be assigned to a role and the role must have the permission of view-roles`

```

```
Create Role
localhost:4000/api/role/create - POST

{
  "name": "admin"
}


```


