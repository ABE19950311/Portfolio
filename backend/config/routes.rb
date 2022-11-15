Rails.application.routes.draw do
  get "/getuser", to:"registrations#index"
  post "/signup", to: "registrations#signup"
  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#logout"
  post "/usercheck", to: "sessions#usercheck"
  get "/sessions", to: "sessions#show"
  get "/sessionid", to: "sessions#sessionid"
  get "/myboards", to: "boards#myboard"
  get "/myposts", to: "posts#mypost"
  get "/myhearts", to: "hearts#myheart"
  get "/sessionname", to:"sessions#sessionname"
  patch "/newpass", to:"registrations#update"
  post "/userposts", to:"lifeposts#userpost"

  resources :todos
  resources :boards
  resources :posts
  resources :hearts
  resources :mypages
  resources :lifeposts

  get "/health_check", to: "health_check#health_check"
end
