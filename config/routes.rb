Rails.application.routes.draw do
	devise_for :users, controllers: {omniauth_callbacks: "omniauth_callbacks"}

	root "application#home"

	resources :sites, only: [:new, :create]
end
