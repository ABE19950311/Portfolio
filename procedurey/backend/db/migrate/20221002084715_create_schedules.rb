class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules do |t|
      t.references :todo, foreign_key:true
      t.string :startdate,null:false
      t.string :duedate,null:false

      t.timestamps
    end
  end
end
