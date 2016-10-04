class AddUserToPages < ActiveRecord::Migration[5.0]
  def change
    add_reference :pages, :user, foreign_key: true
  end
end
