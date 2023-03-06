require 'rails_helper'

RSpec.describe "Pdfs", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/pdfs/show"
      expect(response).to have_http_status(:success)
    end
  end

end
