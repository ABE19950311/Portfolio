class CreateHelpfuls < ActiveRecord::Migration[7.0]
  def change
    create_table :helpfuls do |t|
      t.references :user, foreign_key:true
      t.references :lifepost, foreign_key:true

      t.timestamps
    end
  end
end
