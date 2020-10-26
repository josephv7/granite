class Api::V1::SessionsController < Devise::SessionsController
    respond_to :json
    before_action :generate_authentication_token, only: [:create]

    def create
        user = User.find_for_database_authentication(email: login_params[:email])
        if invalid_password?(user)
          respond_with_error "Incorrect email or password", 401
        else
          user.update(:authentication_token => @token)
          sign_in(user)
          render json: { user: user, redirect_to: stored_location_for(user) }
        end
      end

      def invalid_password?(user)
        user.blank? || !user.valid_password?(login_params[:password])
      end
  
      # def generate_authentication_token
      #   loop do
      #       @token = Devise.friendly_token
      #       break @token unless User.where(authentication_token: @token).first
      #     end
      # end

      def login_params
        params.permit(:email, :password)
      end
end
