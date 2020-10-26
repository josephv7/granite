class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    # skip_before_action :verify_authenticity_token
    respond_to :json
    include TokenAuthentication

    def respond_with_error(message, status = 500)
        render json: { error: message }, status: status
    end
end
