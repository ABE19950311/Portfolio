class User < ApplicationRecord
    has_secure_password
    has_many :todos #子モデル（多に該当するので複数形）

end
