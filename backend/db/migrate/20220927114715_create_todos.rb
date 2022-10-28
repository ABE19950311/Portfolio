class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.references :user, foreign_key:true
      t.string :list, null:false
      t.string :startdate
      t.string :duedate
      t.string :life

      t.timestamps
    end
  end
end
