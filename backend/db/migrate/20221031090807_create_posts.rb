class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.references :user, foreign_key:true
      t.references :board, foreign_key:true
      t.string :username
      t.string :postcontent, null:false

      t.timestamps
    end
  end
end
