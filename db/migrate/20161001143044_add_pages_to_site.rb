class AddPagesToSite < ActiveRecord::Migration[5.0]
  def change
    add_reference :sites, :pages, foreign_key: true
  end
end
