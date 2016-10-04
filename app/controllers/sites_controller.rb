class SitesController < ApplicationController

	def index
		respond_with Site.all
	end

	def create
		respond_with Site.create(site_params.merge(user_id: current_user.id))
	end

	def update
		site = Site.find(params[:id])
		site.update(site_params)
		respond_with site
	end

  private

  def site_params
  	params.require(:site).permit(:name, :pages)
  end
end