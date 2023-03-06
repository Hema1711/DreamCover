class Order < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :delivery_status, :string
    add_column :orders, :product_id, :string
    remove_column :orders, :cart_unique_id, :string
  end
end
