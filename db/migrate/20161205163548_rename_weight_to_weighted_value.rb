class RenameWeightToWeightedValue < ActiveRecord::Migration[5.0]
  def change
    rename_column :participantinputs, :weight, :weighted_value
  end
end
