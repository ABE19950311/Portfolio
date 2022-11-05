Rails.application.routes.draw do
  get "/getuser", to:"registrations#index"
  post "/signup", to: "registrations#signup"
  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#logout"
  get "/logged_in", to: "sessions#logged_in?"
  get "/sessions", to: "sessions#show"
  get "/sessionid", to: "sessions#sessionid"

  resources :todos
  resources :boards
  resources :posts
  resources :hearts

  get "/health_check", to: "health_check#health_check"
end
