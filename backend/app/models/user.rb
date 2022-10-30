class User < ApplicationRecord
    has_secure_password
    has_many :todos #子モデル（多に該当するので複数形）
    has_many :boards

    # 重複登録NG
    validates :username, uniqueness: true
end
