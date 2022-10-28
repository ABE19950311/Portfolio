class User < ApplicationRecord
    has_secure_password
    has_many :todos #子モデル（多に該当するので複数形）
    has_many :user_boards, dependent: :destroy
    has_many :boards, through: :user_boards

    # 重複登録NG
    validates :username, uniqueness: true
end
