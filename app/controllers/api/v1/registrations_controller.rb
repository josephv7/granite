class Api::V1::RegistrationsController < Devise::RegistrationsController
    respond_to :json
    before_action :generate_authentication_token, only: [:create]

    def create
        build_resource(sign_up_params.merge(:authentication_token => @token))
        resource.save

        if resource.persisted?
            render json: { user: resource, notice: "Account Created Successfully!" }
        else
            render json: { errors: resource.errors }, status: :unprocessable_entity
        end
    end

   

    
    def sign_up_params
        params.permit(:email, :password, :password_confirmation)
    end


end
