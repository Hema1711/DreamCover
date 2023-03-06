require 'spec_helper'

RSpec.describe User, type: :model do 

  context "model validation" do

    it "validates model association" do
        
        is_expected.to have_many(:address)
        is_expected.to have_many(:return)
        is_expected.to have_many(:orders)
        is_expected.to have_many(:deliveries)
        is_expected.to have_many(:cancellation)

        is_expected.to have_many(:carts)
        is_expected.to have_many(:products)
    end


    it 'uniqueness validation' do
        is_expected.to validate_uniqueness_of(:email)
        # .conditions:->{where(is_active: true)
    end
end


end
