class Todo < ApplicationRecord
    belongs_to :user #親テーブル（１側に該当するので単数形）

end
