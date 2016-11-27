Rails.application.routes.draw do
  #resources :meetings
  root   'static_pages#home'
  get    '/help',    to: 'static_pages#help'
  get    '/about',   to: 'static_pages#about'
  get    '/contact', to: 'static_pages#contact'
  get    '/signup',  to: 'users#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  #resources :users do
    #get 'meetings',to: 'meetings#index', on: :member
    #get 'meetings/:id',to: 'meetings#show', on: :member
    #get 'meetings/:id/edit',to: 'meetings#edit', on: :member
    #get 'meetings/new',to: 'meetings#new', on: :member
    #post 'meetings/new',to: 'meetings#create', on: :member
  #end
  resources :users do
  resources :meetings
end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
