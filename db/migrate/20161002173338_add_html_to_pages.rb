class AddHtmlToPages < ActiveRecord::Migration[5.0]
  def change
    add_column :pages, :html, :string
  end
end
