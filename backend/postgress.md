
sudo -u postgres psql
CREATE USER simanta WITH PASSWORD 'password';
CREATE DATABASE blink_worx;
GRANT ALL PRIVILEGES ON DATABASE blink_worx TO simanta;
ALTER USER simanta WITH SUPERUSER;


# login
psql -U simanta -h localhost -d blink_worx
password