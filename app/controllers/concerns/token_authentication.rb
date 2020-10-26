module TokenAuthentication
    extend ActiveSupport::Concern

    def generate_authentication_token
        loop do
            @token = Devise.friendly_token
            break @token unless User.where(authentication_token: @token).first
        end
    end

end