class HeartsController < ApplicationController

    def index
        @heart = Heart.all
        render json:@heart
    end

    def myheart
        @user_id = User.find_by(username: session[:user_name]).id
        @heart = Heart.where(user_id: @user_id)
        render json:@heart
    end

    def create
        @heartidcheck = Heart.where(post_id: heart_params[:post_id], user_id: heart_params[:user_id]).exists?
        if @heartidcheck
            @heartid = Heart.find_by(post_id: heart_params[:post_id], user_id: heart_params[:user_id]).id
            @heart = Heart.find(@heartid)
            @heart.destroy
            render json:{status: :none,heart: @heart}
        else
            @heart = Heart.create(heart_params)
            render json:{status: :created,heart: @heart}
        end
    end

    private

    def heart_params
        params.require(:hearts).permit(:post_id,:user_id)
    end

end
