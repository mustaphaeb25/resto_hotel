#!/bin/bash
# Start PostgreSQL if not running
/usr/lib/postgresql/16/bin/pg_ctl -D /tmp/pgdata -l /tmp/pgdata/logfile -o "-p 5433" status 2>/dev/null || \
/usr/lib/postgresql/16/bin/pg_ctl -D /tmp/pgdata -l /tmp/pgdata/logfile -o "-p 5433" start

# Start backend
cd "$(dirname "$0")"
node src/index.js
