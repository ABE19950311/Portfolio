class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :user, foreign_key:true
      t.references :lifepost, foreign_key:true
      t.string :comment, null:false
      t.string :commentuser, null:false

      t.timestamps
    end
  end
end
