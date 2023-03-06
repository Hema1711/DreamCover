class Wishlist < ApplicationRecord
    # validates_uniqueness_of :product_unique_id  #,conditions:->{where(is_active: true)} 
    validates_uniqueness_of :product_unique_id, scope: [:user_unique_id],conditions:->{where(is_active: true)}
end
