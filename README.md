### First, using docker run:

- `docker run --name postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres`

### To create database:

- Create a `.env` file

- Create postgres variables, Ex:

    -   `DB_HOST`=localhost <br>
        `DB_PORT`=5432 <br>
        `DB_USER`=postgres <br>
        `DB_PASSWORD`=root <br>
        `DATABASE`=backend  <br>   

- Then run:

    - `make init`

### To run the project:

- `make run`
