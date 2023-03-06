class ProductsController < ApplicationController
	
	skip_before_action :verify_authenticity_token
	
	def index
		@data=Product.all
	end

	def all_product
		# byebug
		@informations,@total_count = ProductInformation::ProductService.get_all_products(params[:load_count].to_i,params[:search_text])
		render json: [@informations,@total_count]
	end

	def products_for_owner
		# byebug
		user_id = session[:current_user_id]
		@informations,@total_count = ProductInformation::ProductService.products_for_owner(params[:search_text],user_id)
		render json: [@informations,@total_count]
	end


	def new_arrival
		# byebug
		@informations, @total_count = ProductInformation::ProductService.new_arrivals(params[:load_count].to_i,params[:search_text])	
		render json: [@informations,@total_count]
	end

	def featured_product
		# byebug
		@featured_product = Product.last
		render json: @featured_product
	end

	def single_product
		# byebug
		@single_product = ProductInformation::ProductService.single_product(params[:product_unique_id])
	end

	def new_product
		@product_info=ProductInformation::ProductService.new_product
	end

	def create_product
		# byebug
		user_id = session[:current_user_id]
		@product_info = ProductInformation::ProductService.create_product(parameters,user_id)
		redirect_to product_owner_index_path
	end

	def edit_product
		@product_info=ProductInformation::ProductService.edit_product(params[:product_unique_id])
	end

	def update_product
		# byebug
		@product_info=ProductInformation::ProductService.update_product(params[:product_unique_id],parameters)
		redirect_to product_owner_index_path
	end


	def delete_product
		# byebug
		@product_info=ProductInformation::ProductService.delete_product(params[:product_unique_id])
		render json: @product_info
	end


	private
	
	def parameters
		params.require(:product).permit(:product_name, :product_code,:product_price, :product_size, :product_image1, :product_image2, :product_image3, :product_image4, :product_image5, :product_cart_id, :product_description, :product_image2)
	end
end
