class Postcontent < ApplicationRecord
    has_many :board_postcontents, dependent: :destroy
    has_many :boards, through: :board_postcontents
end
