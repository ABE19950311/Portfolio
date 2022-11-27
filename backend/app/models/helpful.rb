class Helpful < ApplicationRecord
    belongs_to :user
    belongs_to :lifepost

    validates_uniqueness_of :lifepost_id, scope: :user_id
end
