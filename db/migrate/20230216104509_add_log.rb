class AddLog < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :user_unique_id, :string

    add_column :order_logs, :order_log_unique_id, :string
    add_column :order_logs, :customer_name, :string
    add_column :order_logs, :customer_address, :string
    add_column :order_logs, :delivery_status, :string
  end
end
