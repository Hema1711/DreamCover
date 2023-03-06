class Invoice < ActiveRecord::Migration[7.0]
  def change
    add_column :invoices, :user_unique_id, :string
    add_column :invoices, :cart_unique_id, :string
    add_column :invoices, :invoice_unique _id, :string
  end
end
