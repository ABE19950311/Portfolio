class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :list, null:false
      t.date :startdate
      t.date :duedate
      t.string :procedure

      t.timestamps
    end
  end
end
