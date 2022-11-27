class HelpfulsController < ApplicationController

    def index 
        @helpful = Helpful.all
        render json:@helpful
    end

    def create
        @helpful = Helpful.create(helpful_params)
        render json:@helpful
    end

    def destroy
        @helpful = Helpful.find_by(user_id: helpful_params[:user_id],lifepost_id: helpful_params[:lifepost_id])
        @helpful.destroy
        render json:@helpful
    end

    private

    def helpful_params
        params.require(:helpfuls).permit(:user_id,:lifepost_id)
    end

end
