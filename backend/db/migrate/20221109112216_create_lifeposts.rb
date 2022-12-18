class CreateLifeposts < ActiveRecord::Migration[7.0]
  def change
    create_table :lifeposts do |t|
      t.references :user, foreign_key:true
      t.text :title, null:false
      t.text :lifeitem, null:false
      t.text :headline, null:false
      t.binary :image
      t.text :content, null:false
      t.text :detail, null:false
      t.text :checkcontent

      t.timestamps
    end
  end
end
