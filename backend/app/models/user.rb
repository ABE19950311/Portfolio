class User < ApplicationRecord
    has_secure_password
    has_one :mypage
    has_many :todos
    has_many :boards
    has_many :contacts
    has_many :posts
    has_many :hearts, dependent: :destroy
    has_many :posts, through: :hearts
    has_many :lifeposts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :lifeposts, through: :comments
    has_many :helpfuls, dependent: :destroy
    has_many :lifeposts, through: :helpfuls

    validates :username, uniqueness: true
end
