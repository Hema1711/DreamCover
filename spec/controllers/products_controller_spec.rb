require 'rails_helper'
RSpec.describe ProductsController, type: :controller do 

    describe "Product Information Index " do 
        let(:product_info){ProductInformation::ProductService}        
        let(:object){[instance_double(Product)]}

        context "Get all the records from the Product Informations #index" do
            
            it 'success' do
                expect(product_info).to receive(:index).and_return(object)
                get :index
                expect(response).to have_http_status(200)
            end

            it 'exception' do
                    expect(product_info).to receive(:index).and_raise(StandardError,"Error")
                    get :index
            end
        end 

    end
end