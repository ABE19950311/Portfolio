class CreateHearts < ActiveRecord::Migration[7.0]
  def change
    create_table :hearts do |t|
      t.references :user, foreign_key:true
      t.references :post, foreign_key:true

      t.timestamps
    end
  end
end
