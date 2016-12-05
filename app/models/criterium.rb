class Criterium < ApplicationRecord
  validates :name, presence: true
  belongs_to :meeting , optional: true
end
