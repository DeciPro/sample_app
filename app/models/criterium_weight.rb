class CriteriumWeight < ApplicationRecord
  validates :weight, presence: true,
            numericality: { only_integer: true, greater_than: 0, less_than: 6, message: 'must be between 1 and 5' }
  belongs_to :participant, optional: true
  belongs_to :criterium
end
