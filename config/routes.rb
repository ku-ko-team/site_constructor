Rails.application.routes.draw do
	devise_for :users, controllers: {omniauth_callbacks: "omniauth_callbacks"}

	root "application#home"

	resources :sites
	resources :pages

	get '/sites/:id/pages', to: "pages#site_pages"
	put '/sites/:site_id/pages/:page_id/change_page_position', to: "pages#change_page_position"
	get '/sites/:site_id/pages/:page_id', to: "pages#show"
end
