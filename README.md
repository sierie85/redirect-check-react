# Redirect-Check-React

The redirect-check frontend, built with React, performs checks to determine if a given domain and a CSV file containing paths redirect to the intended destinations.

run dev server:

```bash
npm run dev
```

create and run with docker:

```bash
docker build -t redirect-check-fe .
docker run -p 3000:80 redirect-check-fe
```
