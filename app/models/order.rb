class Order < ApplicationRecord
    belongs_to :cart, optional: true
	# has_one :order_detail
	has_one :payment
	has_one :delivery
	has_one :order_log
	has_one :return
	has_one :cancellation


	# belongs_to :user
	# has_many :order_items, dependent: :destroy
	# has_many :products, through: :order_items
	# has_many :order_logs, dependent: :destroy


	# validates_uniqueness_of :cart_unique_id  ,conditions:->{where(is_active: true)}
	# validates_uniqueness_of :cart_unique_id, scope: [:user_unique_id]
end
