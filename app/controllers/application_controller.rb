class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception

	respond_to :json

	skip_before_action :verify_authenticity_token, if: :json_request?
	before_action :configure_permitted_parameters, if: :devise_controller?

	def home
		render 'layouts/application'
	end

protected

  def json_request?
    request.format.json?
  end

private 
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
  end
end