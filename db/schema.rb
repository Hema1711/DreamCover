# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_01_124953) do
  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.integer "resource_id"
    t.string "author_type"
    t.integer "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "addresses", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "flat_no"
    t.string "house_name"
    t.string "street_name"
    t.integer "pincode"
    t.string "city"
    t.string "country"
    t.string "state"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "cancellations", force: :cascade do |t|
    t.datetime "date"
    t.integer "payment_id"
    t.integer "user_id"
    t.integer "checkout_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cart_logs", force: :cascade do |t|
    t.integer "cart_id"
    t.integer "initial_value"
    t.integer "final_value"
    t.string "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "product_unique_id"
    t.string "user_unique_id"
    t.string "cart_unique_id"
    t.boolean "is_active", default: true
    t.string "product_name"
    t.string "product_description"
    t.integer "product_price"
    t.string "product_image1"
    t.integer "product_quantity", default: 1
  end

  create_table "categories", force: :cascade do |t|
    t.string "category_name"
    t.string "description"
    t.integer "sub_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "deliveries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "order_id"
    t.integer "delivery_partner_id"
    t.integer "delivery_status_id"
    t.integer "cancellation_id"
    t.string "delivery_unique_id"
  end

  create_table "delivery_logs", force: :cascade do |t|
    t.integer "delivery_id"
    t.integer "intial_value"
    t.integer "final_value"
    t.string "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delivery_partners", force: :cascade do |t|
    t.string "name"
    t.string "city"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "delivery_statuses", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "discounts", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "discount_percent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invoices", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_unique_id"
    t.string "cart_unique_id"
    t.string "invoice_unique_id"
  end

  create_table "order_details", force: :cascade do |t|
    t.integer "order_id"
    t.integer "line_item_id"
    t.integer "quantity"
    t.integer "applied_discount_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "order_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "order_logs", force: :cascade do |t|
    t.integer "order_id"
    t.integer "initial_value"
    t.integer "final_value"
    t.string "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "order_log_unique_id"
    t.string "customer_name"
    t.string "customer_address"
    t.string "delivery_status"
    t.string "user_profile"
    t.string "products_id"
  end

  create_table "orders", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total"
    t.integer "payment_id"
    t.string "order_unique_id"
    t.string "user_unique_id"
    t.string "delivery_status"
    t.string "product_id"
    t.string "customer_name"
    t.string "customer_address"
    t.string "user_profile"
  end

  create_table "payment_gateways", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payments", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "payment_customer_id"
    t.string "payment_desc"
    t.string "payment_amount"
    t.datetime "date"
  end

  create_table "product_carts", force: :cascade do |t|
    t.integer "product_id"
    t.integer "cart_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "product_discounts", force: :cascade do |t|
    t.integer "discount_id"
    t.integer "product_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "product_stocks", force: :cascade do |t|
    t.integer "total_stock"
    t.integer "unit_price"
    t.integer "total_price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "product_name"
    t.string "product_description"
    t.string "product_code"
    t.integer "product_price"
    t.string "product_image1"
    t.string "product_image2"
    t.string "product_image3"
    t.string "product_image4"
    t.string "product_image5"
    t.string "product_unique_id"
    t.boolean "is_active", default: true
    t.string "product_size"
    t.string "user_unique_id"
  end

  create_table "return_logs", force: :cascade do |t|
    t.integer "return_id"
    t.integer "initial_value"
    t.integer "final_value"
    t.string "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "returns", force: :cascade do |t|
    t.integer "delivery_id"
    t.integer "user_id"
    t.boolean "product_acceptable"
    t.boolean "refund_inititation"
    t.boolean "product_received"
    t.boolean "refund_amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sub_categories", force: :cascade do |t|
    t.string "sub_category_name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_addresses", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_details", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.string "unique_id"
    t.string "country"
    t.string "state"
    t.string "city"
    t.integer "pincode"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.integer "phone_number"
    t.string "file_extension"
    t.string "cart_unique_id"
    t.boolean "is_active", default: true
    t.boolean "is_owner", default: false
    t.boolean "is_user", default: true
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.integer "phone_number"
    t.string "file_extension"
    t.integer "address_id"
    t.string "unique_id"
    t.string "country"
    t.string "state"
    t.string "city"
    t.integer "pincode"
    t.boolean "is_active", default: true
    t.string "cart_unique_id"
    t.string "password_digest"
    t.string "roles", default: "user"
  end

  create_table "wishlists", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "product_unique_id"
    t.string "user_unique_id"
    t.boolean "is_active", default: true
    t.string "product_name"
    t.string "product_description"
    t.integer "product_price"
    t.string "product_image1"
    t.integer "product_quantity", default: 1
  end

end
