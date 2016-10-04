class PagesController < ApplicationController
	
	def index
		respond_with Page.all
	end

	def create
		pages = Page.all.where(site_id: params[:site_id])
		if pages.empty?
			position = 1
		else
			position = pages.order("position DESC").first.position + 1
		end

		respond_with Page.create(page_params.merge(user_id: current_user.id, position: position))
	end

	def show
		respond_with Page.find(params[:id])
	end

	def update
		page = Page.find(params[:id])
		page.update(page_params)
		respond_with page
	end

	def change_page_position
		dragged_page = Page.find(params[:id])
		old_position = dragged_page.position
		new_position = params[:position]
		if  old_position > new_position		#so page is moving up
			Page.all.decrease_position(new_position, old_position).each do |p|
				p.position += 1
				p.save!
			end
		elsif old_position < new_position	#so page is moving down
			new_position -= 1  #CRUTCH (somehow when dragging from top to bottom index is getting extra +1; with dragging from bottom to top everything is ok)
			Page.all.increase_position(new_position, old_position).each do |p|
				p.position -= 1
				p.save!
			end
		end
		dragged_page.position = new_position
		dragged_page.save!
	end

	def site_pages
		respond_with Page.all.where(site_id: params[:id]).order("position ASC")
	end

  private

  def page_params
  	params.require(:page).permit(:name, :site_id, :layout_id, :html, :position)
  end
end