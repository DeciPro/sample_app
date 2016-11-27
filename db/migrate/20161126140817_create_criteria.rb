class CreateCriteria < ActiveRecord::Migration[5.0]
  def change
    create_table :criteria do |t|
      t.references :meeting, foreign_key: true
      t.string :name
      t.integer :weight

      t.timestamps
    end
  end
end
