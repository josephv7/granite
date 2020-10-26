class Api::V1::BaseController < ApplicationController
    before_action :authenticate_user_using_token

        respond_to :json
    

        def authenticate_user_using_token
            auth_token = request.headers["X-Auth-Token"].presence

            user = User.find_by_authentication_token(auth_token)

            if user && Devise.secure_compare(user.authentication_token, auth_token)
                sign_in user, store: false
            else
                respond_with_error("Could not authenticate with the provided credentials", 401)
            end
        end
end
