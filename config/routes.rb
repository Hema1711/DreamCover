Rails.application.routes.draw do
  # devise_for :admin_users, ActiveAdmin::Devise.config
#   ActiveAdmin.routes(self)

  root 'users#login_index'
   
#   ==============================Login Portions==================================================================

  get 'auth0_login' , to: "auth0#auth0_login", as: :auth0_login

  get '/auth/auth0/callback' => 'auth0#callback'

  get '/auth/failure' => 'auth0#failure'

  get '/auth/logout' => 'auth0#logout'

  get "/login", to: "users#login_index" , as: :login_index

  #---------------------------------Product and Product index--------------------------------------------------------
  
  get "/landing_page", to: "products#index" , as: :index 
   
   get "/product/product_index", to: "products#product_index", as: :product_index
   
   post "/products/all_product", to: "products#all_product"

   post "/products/new_arrival", to: "products#new_arrival"

   get "/products/featured_product",to: "products#featured_product"

   get "/products/single_product/:product_unique_id", to: "products#single_product", as: :single_product

   get "/products/new_product", to: "products#new_product",as: :new_product

   post "/products/create_product", to: "products#create_product",as: :create_product

   get "/products/edit_product/:product_unique_id", to: "products#edit_product",as: :edit_product

   put  "/products/update_product/:product_unique_id", to: "products#update_product",as: :update_product
   
   delete "/products/delete_product/:product_unique_id", to: "products#delete_product",as: :delete_product

       
   get "/products/search_result", to: "products#search_result",as: :search_result


   

  #--------------------------------------User--------------------------------------------------------
   get "/users/get_user", to: "users#user_index", as: :user_index

   get "/users/edit_user/:unique_id", to:  "users#edit_user", as: :edit_user

   put "/users/update_user/:unique_id", to:  "users#update_user",as: :update_user

   post "/users/create_user", to:  "users#create_user",as: :create_user

   post "/users/verify_user", to:  "users#verify_user",as: :verify_user

   post "/users/update_password", to:  "users#update_password",as: :update_password


   delete "/users/delete_user", to:  "user#delete_user"

   get "/get_states/:country", to: "users#get_states_by_country",as: :get_states

   get "/get_cities/:state", to: "users#get_cities_by_state", as: :get_cities

   
  
  #---------------------------------------cart----------------------------------------------------------


   post "/carts/cart_details/", to: "carts#cart_details"

   get "/carts/cart_index", to: "carts#cart_index", as: :cart_index

   post "/carts/add_to_cart/", to: "carts#add_to_cart"

   post "/carts/product_qauntity/", to: "carts#product_qauntity"

   get "/carts/new_cart", to:  "carts#new_cart"

   get "/carts/edit_cart", to:  "carts#edit_cart"

   put "/carts/update_cart", to:  "carts#update_cart"
   
   delete "/carts/delete_cart/:product_unique_id", to:  "carts#delete_cart"

   get "/carts/create_pay", to: "carts#create_pay"

     


   
  #---------------------------------------Payment----------------------------------------------------------
   get "/payments/get_payment", to: "payments#payment_index", as: :payment_index
   

   #--------------------------------------Contact and about-----------------------------------------------------------
   get "/products/contact", to: "products#contact_us", as: :contact_us 

   get "/products/about_us", to: "products#about", as: :about 

   # ===================================Wishlist======================================================

   post "/carts/wishlist_details/", to: "carts#wishlist_details"

   get "/carts/wishlist_index", to: "carts#wishlist_index", as: :wishlist_index

   get "/carts/delete_wishlist/:product_unique_id", to: "carts#delete_wishlist"

   post "/carts/add_to_wishlist/", to: "carts#add_to_wishlist"

# ---------------------------Order==========================================
   get "/orders/order_confirmation", to:  "orders#order_index", as: :order_index

   get "/invoice_generate", to: "orders#invoice_generate"
   
   get "/invoice_download", to: "orders#invoice_download", as: :invoice_download

# ---------------------------Delivery==========================================
   get "/orders/delivery_index", to:  "orders#delivery_index", as: :delivery_index
 
# =============================================================================


# ================================================================================

   #---------------------------order-mailer-----------------------------------------
   post "/orders/create_order", to: "orders#create_order"
   #---------------------------delivery-mailer------------------------------------
   post "/deliveries/create_delivery", to: "deliveries#create_delivery"
   #---------------------------cart-mailer---------------------------------------
   post "/carts/create_cart", to: "carts#create_cart"


   get "/users/logout", to: "users#logout", as: :logout

   get "/new_user", to: "users#new_user", as: :new_user 

   get "/forget_password", to: "users#forget_password", as: :forget_password 

 #  ====================================================================


#  ---------------------------------Owner Routes-----------------------


get "/carts/order_log_index", to: "orders#order_log_index", as: :order_log_index

  get "/product_owner_index",to: "products#product_owner_index", as: :product_owner_index

  post "/products/products_for_owner", to: "products#products_for_owner"

  post "/order/get_order_logs", to: "orders#get_order_logs"
  

end
