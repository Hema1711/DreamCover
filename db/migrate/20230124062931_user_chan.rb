class UserChan < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :roles, :string, default: :user
  end
end
