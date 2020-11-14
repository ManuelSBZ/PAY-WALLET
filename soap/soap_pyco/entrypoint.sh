#!/bin/sh
sleep 30s
echo "Collect static files"
python manage.py makemigrations --noinput

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate --noinput



exec "$@"