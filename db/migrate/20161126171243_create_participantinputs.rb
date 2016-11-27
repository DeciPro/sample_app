class CreateParticipantinputs < ActiveRecord::Migration[5.0]
  def change
    create_table :participantinputs do |t|
      t.references :participant, foreign_key: true
      t.references :decision, foreign_key: true
      t.references :criterium, foreign_key: true
      t.integer :weight
      t.integer :value

      t.timestamps
    end
  end
end
