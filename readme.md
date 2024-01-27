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