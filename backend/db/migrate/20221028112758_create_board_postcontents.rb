class CreateBoardPostcontents < ActiveRecord::Migration[7.0]
  def change
    create_table :board_postcontents do |t|
      t.references :board, foreign_key: true
      t.references :postcontent, foreign_key: true
      t.timestamps
    end
  end
end
