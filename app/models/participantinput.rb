class Participantinput < ApplicationRecord
  belongs_to :participant , optional: true
  belongs_to :decision
  belongs_to :criterium
end
