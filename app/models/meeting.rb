class Meeting < ApplicationRecord
  belongs_to :user
  has_many :participants, :dependent => :destroy
  accepts_nested_attributes_for :participants, :allow_destroy => true
  has_many :decisions, :dependent => :destroy
  accepts_nested_attributes_for :decisions, :reject_if => proc  { |attributes| attributes['name'].blank? }, :allow_destroy => true
  has_many :criteria, :dependent => :destroy
  accepts_nested_attributes_for :criteria, :reject_if => proc  { |attributes| attributes['name'].blank? }, :allow_destroy => true
end
