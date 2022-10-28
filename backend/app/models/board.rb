class Board < ApplicationRecord
    has_many :user_boards, dependent: :destroy
    has_many :users, through: :user_boards
    has_many :board_postcontents, dependent: :destroy
    has_many :postcontents, through: :board_postcontents

    # 重複登録NG
    validates :username, uniqueness: true
end
