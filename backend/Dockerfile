FROM ruby:3.1.2

ENV RAILS_ENV=production

WORKDIR /backapp
# リポジトリを更新し依存モジュールをインストール
RUN apt-get update -qq && \
    apt-get install -y build-essential \
    nodejs
# yarnパッケージ管理ツールインストール
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn
# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs
COPY Gemfile Gemfile.lock* /backapp/
RUN bundle install
COPY . /backapp/
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# puma.sockを配置するディレクトリを作成
RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids

VOLUME /backapp/public
VOLUME /backapp/tmp

CMD /bin/sh -c "rm -f tmp/pids/server.pid && bundle exec puma -C config/puma.rb"
