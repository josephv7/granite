class Task < ApplicationRecord
  validates :description, presence: true
  belongs_to :user, optional: true
  has_many :comments, dependent: :destroy
end
