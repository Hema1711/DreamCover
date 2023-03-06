module ProductInformation
	class OrderService

		def self.new_order(unique_id ,product_unique_id , order_id, customer_name , address, customer_profile)
			# byebug
			order =  Order.new(order_unique_id: order_id, product_id: product_unique_id, user_unique_id: unique_id, delivery_status: "Pending", customer_name: customer_name ,customer_address: address , user_profile: customer_profile )
			order.save
			
		end

		def self.create_order(order_params)
			# byebug
			@order = Order.new(order_params)
			if @order.save
				OrderMailer.welcome_email.deliver
				puts "Order successfully created"
			else
				puts "order not created"
			end
		end

		def self.create_invoice((unique_id , cart_unique_id , invoice_id))
			# byebug
			invoice = Invoice.new(invoice_unique_id: invoice_id, cart_unique_id:cart_unique_id, user_unique_id: unique_id )
		end

		def self.delete_order(order_id)
			data = Order.find(order_id)
			data.update(is_active: false)
		end
	end
end