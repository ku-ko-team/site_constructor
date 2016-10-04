class CreatePages < ActiveRecord::Migration[5.0]
  def change
    create_table :pages do |t|
      t.string :name
      t.references :site, foreign_key: true
      t.integer :layout_id

      t.timestamps
    end
  end
end
