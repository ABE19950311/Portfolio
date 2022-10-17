#!/bin/bash

sudo service nginx start
cd /backapp
bin/setup
bundle exec pumactl start