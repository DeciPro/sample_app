class CreateCriteriumWeights < ActiveRecord::Migration[5.0]
  def change
    create_table :criterium_weights do |t|
      t.integer :weight
      t.references :participant, foreign_key: true
      t.references :criterium, foreign_key: true

      t.timestamps
    end
  end
end
