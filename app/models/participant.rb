class Participant < ApplicationRecord
  belongs_to :meeting , optional: true
end
