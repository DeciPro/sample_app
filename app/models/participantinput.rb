class Participantinput < ApplicationRecord
  belongs_to :participant
  belongs_to :decision
  belongs_to :criterium
end
