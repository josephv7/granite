class Task < ApplicationRecord
  validates :description, presence: true
  belongs_to :user, optional: true
  has_many :comments, dependent: :destroy
  after_create :log_task_details

  def log_task_details
    TaskLoggerJob.perform_later(self)
  end
end
