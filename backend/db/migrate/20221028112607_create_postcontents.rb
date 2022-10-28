class CreatePostcontents < ActiveRecord::Migration[7.0]
  def change
    create_table :postcontents do |t|
      t.time :postdate, null:false
      t.string :postcontent, null:false
      t.string :username

      t.timestamps
    end
  end
end
