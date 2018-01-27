# How to start the project


## Instal python 3.6

[Check this post](https://askubuntu.com/a/865569)


## Install and create virtualenv

```bash
sudo apt-get install python3-pip
sudo pip3 install virtualenv

mkdir ~/.virtualenvs
virtualenv ~/.virtualenvs/easy_order -p /usr/bin/python3.6
```


## Install project dependencies

```bash
source ~/.virtualenvs/easy_order/bin/activate

pip install -r requirements.txt
```


## Create new Postgres database

```bash
sudo -u postgres createdb -O <your-postgres-username> easy_order
```


## Run project on localhost:8000

```bash
python manage.py migrate
python manage.py runserver
```

## Run tests

```bash
py.test --no-print-log
```