class Participant < ApplicationRecord
  belongs_to :meeting , optional: true
  has_many :participantinputs, :dependent => :destroy
  accepts_nested_attributes_for :participantinputs, :allow_destroy => true
end
