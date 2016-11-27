class Decision < ApplicationRecord
  belongs_to :meeting , optional: true
end
