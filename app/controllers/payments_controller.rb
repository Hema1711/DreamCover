class PaymentsController < ApplicationController
    skip_before_action :verify_authenticity_token
    # before_action :admin, only: [:show, :update, :destroy, :edit]

    def payment_index
        # byebug
		@data=Payment.all
	end
end
