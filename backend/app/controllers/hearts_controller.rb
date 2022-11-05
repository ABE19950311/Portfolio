class HeartsController < ApplicationController

    def index
        @heart = Heart.all
        render json:@heart
    end

    def create
        @current_id = User.find_by(username: session[:user_name]).id
        @heart = Heart.create(heart_params)
        render json:@heart
    end
    

    private

    def heart_params
        params.require(:hearts).permit(:post_id,:user_id)
    end

end
