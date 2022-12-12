class CreateLifeposts < ActiveRecord::Migration[7.0]
  def change
    create_table :lifeposts do |t|
      t.references :user, foreign_key:true
      t.string :title, null:false
      t.string :lifeitem, null:false
      t.string :headline, null:false
      t.binary :image
      t.string :content, null:false
      t.string :detail, null:false
      t.string :checkcontent

      t.timestamps
    end
  end
end
