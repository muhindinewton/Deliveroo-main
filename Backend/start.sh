#!/bin/bash

# Start the FastAPI application with Gunicorn for production
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:$PORT
