class CreateParticipants < ActiveRecord::Migration[5.0]
  def change
    create_table :participants do |t|
      t.string :name
      t.string :email
      t.references :meeting, foreign_key: true

      t.timestamps
    end
  end
end
