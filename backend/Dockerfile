FROM ruby:3.1.2

WORKDIR /backapp
COPY Gemfile Gemfile.lock* /backapp/
#RUN apt-get update -qq && apt-get install -y nodejs yarn 
RUN apt-get update -qq && apt-get install -y nodejs yarn \
    sudo nginx
RUN bundle install
COPY . /backapp/
##nginx
RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids
RUN groupadd nginx
RUN useradd -g nginx nginx
ADD nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN chmod +x /backapp/entrypoint.sh

CMD ["/backapp/entrypoint.sh"]