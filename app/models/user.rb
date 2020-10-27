class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  before_save :set_user_name

  has_many :tasks, dependent: :destroy
  has_many :comments, dependent: :destroy

  def set_user_name
    self.user_name = email.partition("@")[0] if user_name.blank?
  end

  
end
