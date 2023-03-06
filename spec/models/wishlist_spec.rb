require 'rails_helper'

RSpec.describe Wishlist, type: :model do

  context "model validation" do

    it "validates model association" do
    is_expected.to validate_uniqueness_of(:email) 
    end
  end
end
