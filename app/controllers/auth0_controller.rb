# ./app/controllers/auth0_controller.rb
class Auth0Controller < ApplicationController
  
  $session_user=""


  def callback

    # OmniAuth stores the information returned from Auth0 and the IdP in request.env['omniauth.auth'].
    # In this code, you will pull the raw_info supplied from the id_token and assign it to the session.
    # Refer to https://github.com/auth0/omniauth-auth0/blob/master/EXAMPLES.md#example-of-the-resulting-authentication-hash for complete information on 'omniauth.auth' contents.
    # byebug
    auth_info = request.env['omniauth.auth']
    session[:userinfo] = auth_info['extra']['raw_info']

    # $session_user = session[:userinfo].name
    # unique_id = SecureRandom.alphanumeric(20)
    # cart_unique_id =  SecureRandom.alphanumeric(8)
    # current_user= ProductInformation::UserService.create_user(unique_id,$session_user,cart_unique_id)

    # Redirect to the URL you want after successful auth
    # redirect_to '/landing_page'
    redirect_to login_index_path 
  end



  def failure
    # Handles failed authentication -- Show a failure page (you can also handle with a redirect)
    @error_msg = request.params['message']
  end


  def logout
    # byebug
    reset_session
    redirect_to logout_url, allow_other_host: true
  end


  private

  def logout_url
    request_params = {
      returnTo: root_url,
      client_id: AUTH0_CONFIG['auth0_client_id']
    }

    URI::HTTPS.build(host: AUTH0_CONFIG['auth0_domain'], path: '/v2/logout', query: request_params.to_query).to_s
  end

end