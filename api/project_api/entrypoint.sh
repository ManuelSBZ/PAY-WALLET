#!/bin/sh

sleep 60s

gunicorn entrypoint:app --bind 0.0.0.0:7878 --workers=1 
exec "$@"