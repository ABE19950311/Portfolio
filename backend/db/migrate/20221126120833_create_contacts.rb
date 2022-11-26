class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.references :user, foreign_key:true
      t.string :contactpost

      t.timestamps
    end
  end
end
