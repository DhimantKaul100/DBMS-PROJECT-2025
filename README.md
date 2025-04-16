# DBMS-PROJECT-2025
Our project is about disaster managment

- Requirements: ensure you have PostgreSQL, nodejs and npm installed
- how to run:

    1. clone the repo
    ```
    git clone https://github.com/DhimantKaul100/DBMS-PROJECT-2025.git
    ```

    2. create the database and tables
    ```
    cd DBMS-PROJECT-2025
    psql -U postgres

    create database disaster_management;
    \c disaster_management;

    \i '.\\Deadline 3\\creation.sql'
    \i '.\\Deadline 3\\populate_data.sql'
    \i '.\\Deadline 3\\queries.sql'
    ```

    3. run the backend server
    ```
    node .\code\backend\index.js
    ```

    4. open `index.html` in your browser {`.\code\frontend\index.html`}

IMPORTANT: make sure to modift the .env file in the backend folder to include your database credentials.
