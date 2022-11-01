class Board < ApplicationRecord
    #has_many :user_boards, dependent: :destroy
    #has_many :users, through: :user_boards
    has_many :posts, dependent: :destroy
    belongs_to :user

    # 重複登録NG
    validates :username, uniqueness: true
end
