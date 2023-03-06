class UserChanges < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :is_owner, :boolean, default: false
    remove_column :users, :is_user, :boolean, default: true
    remove_column :users, :password
  end
end
