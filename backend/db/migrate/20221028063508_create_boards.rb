class CreateBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.references :user, foreign_key:true
      t.string :posttitle, null:false
      t.string :postcontent, null:false
      t.string :username

      t.timestamps
    end
  end
end
