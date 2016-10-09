class AddImagesToPages < ActiveRecord::Migration[5.0]
  def change
    add_column :pages, :images, :json
  end
end
