Rails.application.routes.draw do
  #resources :meetings
  root   'static_pages#demo'
  # root   'static_pages#home'
  get    '/help',    to: 'static_pages#help'
  get    '/about',   to: 'static_pages#about'
  get    '/demo',   to: 'static_pages#demo'
  get    '/contact', to: 'static_pages#contact'
  get    '/signup',  to: 'users#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  #end
  # resources :users do
  #   resources :meetings
  # end
  # resources :meetings do
  #   resources :participants
  # end

end
