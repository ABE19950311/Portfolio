class Lifepost < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :users, through: :comments
    has_many :helpfuls, dependent: :destroy
    has_many :users, through: :helpfuls

end
