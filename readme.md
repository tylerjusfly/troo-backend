### Troo Backend

```

To create super admin

localhost:4000/api/auth/create

body: {
  "fullname": "Ademide",
  "password": "ladygaga",
  "email": "tyler1@mil.com",
  "company": "Processor"
}

```

```
Login for all users

localhost:4000/api/auth/login

body: {
  "email": "tyler1@mil.com",
  "password": "ladygaga"
}

```

## Database relationship

![image](https://github.com/tylerjusfly/troo-backend/assets/53145644/35f7f0ec-13b5-4f79-9cd8-65c92f37d3d8)



### Many to Many through a junction table

![image](https://github.com/tylerjusfly/troo-backend/assets/53145644/a6c9e1e7-9bae-4c28-b9f6-5869864326dc)

