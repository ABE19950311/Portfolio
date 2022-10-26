class HealthCheckController < ApplicationController
    before_action :set_csrf_token_header
    def health_check
        render json: {result: 'ok'}
    end
end
