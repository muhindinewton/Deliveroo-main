#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Seed the database if needed
python -c "from app.seed import seed_data; seed_data()"
