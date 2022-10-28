class CreateBoards < ActiveRecord::Migration[7.0]
  def change
    create_table :boards do |t|
      t.time :postdate, null:false
      t.string :posttitle, null:false
      t.string :postcontent, null:false
      t.string :username

      t.timestamps
    end
  end
end
