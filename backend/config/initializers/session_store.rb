if Rails.env === 'production'
    Rails.application.config.session_store :cookie_store, key: '_auth-app-api', domain: 'フロントエンドのドメイン'
else
    Rails.application.config.session_store :cookie_store, key: '_auth-app-api'
end

Rails.application.configure do
    config.action_dispatch.cookies_same_site_protection = nil
end