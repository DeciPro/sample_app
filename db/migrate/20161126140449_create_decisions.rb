class CreateDecisions < ActiveRecord::Migration[5.0]
  def change
    create_table :decisions do |t|
      t.references :meeting, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
