class Product < ApplicationRecord
	# has_many :order_items, dependent: :destroy
	# has_many :orders, through: :order_items


	mount_uploader :product_image1, ProductUploader
	mount_uploader :product_image2, ProductUploader
	mount_uploader :product_image3, ProductUploader
	mount_uploader :product_image4, ProductUploader
	mount_uploader :product_image5, ProductUploader

	

end
