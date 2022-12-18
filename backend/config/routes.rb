Rails.application.routes.draw do
  get "/getuser", to:"registrations#index"
  get "/sessionid", to: "sessions#sessionid"
  get "/myboards", to: "boards#myboard"
  get "/myposts", to: "posts#mypost"
  get "/myhearts", to: "hearts#myheart"
  get "/sessionname", to:"sessions#sessionname"
  post "/userposts", to:"lifeposts#userpost"
  post "/usercheck", to: "sessions#usercheck"
  post "/signup", to: "registrations#signup"
  post "/login", to: "sessions#login"
  patch "/newpass", to:"registrations#update"
  delete "/logout", to: "sessions#logout"

  resources :todos
  resources :boards
  resources :posts
  resources :hearts
  resources :mypages
  resources :lifeposts
  resources :comments
  resources :contacts
  resources :helpfuls

  get "/health_check", to: "health_check#health_check"
end
