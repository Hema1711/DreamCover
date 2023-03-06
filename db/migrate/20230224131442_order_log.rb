class OrderLog < ActiveRecord::Migration[7.0]
  def change
    add_column :order_logs, :user_profile, :string
    add_column :order_logs, :products_id, :string
  end
end
