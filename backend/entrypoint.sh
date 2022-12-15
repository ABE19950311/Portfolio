#!/bin/sh
set -e
rm -f /backapp/tmp/pids/server.pid
#RAILS_ENV=production DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rake db:drop
#bundle exec rails db:create RAILS_ENV=production
#bundle exec rails db:migrate RAILS_ENV=production
#bundle exec rails db:seed RAILS_ENV=production
exec "$@"