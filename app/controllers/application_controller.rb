class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    # skip_before_action :verify_authenticity_token
    respond_to :json
    include TokenAuthentication
    include Pundit
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

    def respond_with_error(message, status = 500)
        render json: { error: message }, status: status
    end

    def user_not_authorized
        flash[:warning] = "All accesssable tasks are listed below."
        render json: { error: "Permission Denied" }, status: 403
      end
end
