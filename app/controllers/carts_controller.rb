class CartsController < ApplicationController

	skip_before_action :verify_authenticity_token
    before_action :user_require, only:[:index,:new,:edit,:show]
    before_action :verify_authorization, only:[:new,:create,:index,:delete]

    def product_qauntity
        # byebug
        @quantity = ProductInformation::CartService.product_quantity(params[:product_unique_id],params[:quantity])  
        redirect_to cart_index_path
    end  
    
   
    def cart_details
        # byebug
        @product_price = []
        @cart = ProductInformation::CartService.cart_details(session[:current_user_id])  
        # @cart_detail = @cart[0].cart_unique_id
        @cart.each do |x|
            @cart_total_price = @product_price.push(x.product_price* x.product_quantity).sum
        end
        render json: [@cart, @cart_total_price ]
    end


   
    def add_to_cart
        # byebug
        product_detail = ProductInformation::CartService.add_to_cart(params[:product_unique_id], params[:quantity],session[:current_user_id])
        redirect_to product_index_path
    end



    def delete_cart
        # byebug
        @product_info=ProductInformation::CartService.delete_cart(params[:product_unique_id])
        # redirect_to cart_index_path
    end
 

    # --------------------------------Wishlist------------------------------------------------------------------


    def wishlist_details
        # byebug
        @wishlist_array = []
        @wishlist = ProductInformation::CartService.wishlist_details(session[:current_user_id]) 
         
        @wishlist.each do |x|
            @id =  x.product_unique_id
            @product = Product.find_by(product_unique_id: @id)   
            @wishlist_data = @wishlist_array.push(@product)
        end
        render json: @wishlist_data  
    end


    def add_to_wishlist
        # byebug
        product_detail = ProductInformation::CartService.add_to_wishlist(params[:product_unique_id], params[:quantity],session[:current_user_id] )
        redirect_to product_index_path
    end

  

    def delete_wishlist
        # byebug
        product = ProductInformation::CartService.delete_wishlist(params[:product_unique_id])
        redirect_to wishlist_index_path
    end


    # ========================================================================================================
   

    def new_pay
        # byebug
    end

    def create_pay
        # byebug
        @amount = 500
        customer = Stripe::Customer.create(email: params[:stripeEmail], source: params[:stripeToken])
       charge = Stripe::PaymentIntent.create(:customer => customer.id, :amount => @amount, :description => 'Rails Stripe transaction',:currency => 'usd')
         rescue Stripe::CardError => e
           flash[:error] = e.message
        #  redirect_to new_charge_path 
        redirect_to order_index_path
    end



    def create_cart
        # byebug
        @data = ProductInformation::CartService.create_cart(cart_params)
		head :no_content
    end

   
   
    private

    def cart_params
		# params.require(:cart).permit(:product_description, :product_image1, :product_price, :product_quantity, :user_unique_id, :product_unique_id)
        byebug
        params.permit(:cart)
	end

    
end
