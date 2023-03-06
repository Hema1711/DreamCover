module ProductInformation
	class ProductService

		def self.get_all_products(load_count,search_text)
			# byebug
			informations=Product.where(is_active: true).where("product_name LIKE ?" ,"#{search_text}%")	
			total_count = Product.where(is_active: true).where("product_name LIKE ?" ,"#{search_text}%").count 
			return informations,total_count 
			
		end

		def self.products_for_owner(search_text, user_id)
			# byebug
			informations=Product.where(is_active: true).where(user_unique_id: user_id ).where("product_name LIKE ?" ,"#{search_text}%")	
			total_count = Product.where(is_active: true).where(user_unique_id: user_id ).where("product_name LIKE ?" ,"#{search_text}%").count 
			return informations,total_count 
			
		end



		def self.new_arrivals(load_count,search_text="" )
			# byebug
			if (load_count == 0)
				informations = Product.where(is_active: true).where("product_name LIKE ?","#{search_text}%").offset(load_count).limit(6)
				total_count = Product.where(is_active: true).where("product_name LIKE ?" ,"#{search_text}%").count 
				return informations,total_count 
			else
			
				informations = Product.where(is_active: true).where("product_name LIKE ?","#{search_text}%").offset(load_count).limit(1)
				total_count = Product.where(is_active: true).where("product_name LIKE ?" ,"#{search_text}%").count 
				return informations,total_count 
				
			end

		end

		def self.single_product(product_unique_id)
			# byebug
			product = Product.where(is_active: true).find_by(product_unique_id: product_unique_id)
		end

		def self.new_product
			product = Product.new 
		end

		def self.edit_product(product_unique_id)
			# byebug
			product = Product.find_by(product_unique_id: product_unique_id)
		end

		def self.update_product(product_unique_id, params)
			# byebug
			product = Product.where(is_active: true).find_by(product_unique_id: product_unique_id)
			product.update(params)
		end

	

		def self.create_product(params,user_id)
			# byebug
			product_unique_id = SecureRandom.alphanumeric(6)
			product = Product.create(product_unique_id: product_unique_id,user_unique_id:user_id) 
			@product = product.update(params)
		end




		def self.delete_product(product_unique_id)
			# byebug
			product = Product.find_by(product_unique_id: product_unique_id)
			product.update(is_active:false)
		end
	end
end