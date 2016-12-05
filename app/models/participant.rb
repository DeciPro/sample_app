class Participant < ApplicationRecord
  validates :name, presence: true
  belongs_to :meeting , optional: true
  has_many :participantinputs, :dependent => :destroy
  accepts_nested_attributes_for :participantinputs, :allow_destroy => true
  has_many :criterium_weights, :dependent => :destroy
  accepts_nested_attributes_for :criterium_weights, :allow_destroy => true
end
