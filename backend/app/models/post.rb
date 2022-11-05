class Post < ApplicationRecord
    belongs_to :user
    belongs_to :board
    has_many :hearts, dependent: :destroy
    has_many :users, through: :hearts
end
