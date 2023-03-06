class ApplicationController < ActionController::Base
    # helper_method :current_user, :destroy, :user_require


    # def user_require
    #     if !logged_in
    #         redirect_to login_index_path, notice: "Log in Required"
    #     end
    # end

    # def logged_in
    #     !!current_user
    # end

    # def current_user
    #     @_current_user ||= User.find_by(id: session[:current_user_id]) if session[:current_user_id]
    # end

    # def session_destroy
    #     # Remove the user id from the session
    #     session.delete(:current_user_id)
    #     @_current_user = nil
    #     redirect_to login_path, notice: "Logout from the application"
    # end

    # def verify_authorization
    #     unless session[:current_user_role]
    #         redirect_to show_path, notice:"User Don't have the Authorization to perform this action"
    #     end
    # end
end
