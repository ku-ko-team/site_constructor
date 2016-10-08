class SitesController < ApplicationController

	def index
		respond_with Site.all.reverse
	end

	def show
		respond_with Site.find(params[:id])
	end

	def create
		respond_with Site.create(site_params.merge(user_id: current_user.id))
	end

	def update
		site = Site.find(params[:id])
		site.update(site_params)
		respond_with site
	end

	def destroy
		site = Site.find(params[:id])
		respond_with site.destroy
	end

  private

  def site_params
  	params.require(:site).permit(:name, :pages)
  end
end