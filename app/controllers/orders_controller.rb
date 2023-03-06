class OrdersController < ApplicationController
	 skip_before_action :verify_authenticity_token
	 require 'securerandom'
	def get_order
		@data=ProductInformation::OrderService.get_order
		render :json =>  @data
	end

	def order_index

	
		@user_info = ProductInformation::CartService.cart_index( session[:current_user_id])
		order_id =  SecureRandom.alphanumeric(8)
		cart_data =  Cart.where(cart_unique_id: @user_info.cart_unique_id )
		product_id_array = [] 
        cart_data.each do |x|

			product_unique_id = x[:product_unique_id]
			product_id_array << product_unique_id
			@order = ProductInformation::OrderService.new_order(@user_info.unique_id ,product_unique_id , order_id ,@user_info.first_name,  @user_info.city , @user_info.file_extension)
        end
		session[:order_id] = order_id

		@order_info = Order.where(order_unique_id:  session[:order_id])
		

		# ------------------------------------------------------------------
		invoice_id =  SecureRandom.alphanumeric(8)
		@invoice = invoice = Invoice.new(invoice_unique_id: invoice_id , cart_unique_id:@user_info.cart_unique_id, user_unique_id: @user_info.unique_id  )
		@invoice.save
		session[:current_invoice_id] = @invoice.invoice_unique_id
		 
		
		# order_log = OrderLog.create( order_log_unique_id: order_id, customer_name: @user_info.first_name, customer_address: @user_info.city, delivery_status: "Pending",user_profile: @user_info.file_extension)
		# order_log.save

		#---------------------------------------------------
		@product_price = []
        @cart = ProductInformation::CartService.cart_details(session[:current_user_id])  
        @cart.each do |x|
            @cart_total_price = @product_price.push(x.product_price* x.product_quantity).sum
        end
		@time = Time.now
		
	end

	def get_order_logs
		byebug
		order = Order.all
		order.each do |x|
            @cart_total_price = @product_price.push(x.product_price* x.product_quantity).sum
        end

		render :json =>  order
	end


	

	def delivery_index
		# byebug
		user_detail = ProductInformation::CartService.cart_index( session[:current_user_id])
	end



	# def create_order
	# 	byebug
	# 	@order = ProductInformation::OrderService.create_order(order_params)
	# 	head :no_content
	# end

	def invoice_generate
		# byebug
		@product_price = []
        @cart = ProductInformation::CartService.cart_details(session[:current_user_id])  
        @cart.each do |x|
            @cart_total_price = @product_price.push(x.product_price* x.product_quantity).sum
        end
        # render json: [@cart, @cart_total_price ]
	end

	def invoice_download
		# byebug

		@product_price = []
        @cart = ProductInformation::CartService.cart_details(session[:current_user_id])  
        @cart.each do |x|
            @cart_total_price = @product_price.push(x.product_price* x.product_quantity).sum
        end
		@time = Time.now


		@user_info = User.find_by(unique_id:  session[:current_user_id])
		pdf = WickedPdf.new.pdf_from_string(render_to_string("invoice_download", layout: false))  
		send_data(pdf, filename: "Invoice.pdf", type: "application/pdf")

		#for mail
		# @data = ProductInformation::DeliveryService.create_delivery()
  	end
	

	private
	
	def order_params
		
		params.permit(:order)
	end
end
