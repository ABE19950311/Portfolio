class ApplicationController < ActionController::API
    include ActionController::Cookies
    include ActionController::RequestForgeryProtection
    protect_from_forgery with: :exception


    def set_csrf_token_header
        response.set_header('X-CSRF-Token', form_authenticity_token)
    end

    #before_action :check_xhr_header
    #skip_before_action :verify_authenticity_token
    #helper_method :login!, :current_user

    #private

    #def check_xhr_header
    #    return if request.xhr?

    #     render json: {error:"forbidden"},status: :forbidden
    #end
end
