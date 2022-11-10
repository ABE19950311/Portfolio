class LifepostsController < ApplicationController

    def index
        @lifepost = Lifepost.all
        render json:@lifepost
    end

    def create
        @user_id = User.find_by(username: session[:user_name]).id
        @lifepost = Lifepost.create(life_params.merge(user_id: @user_id))
        render json:@lifepost
    end

    private

    def life_params
        params.require(:lifepost).permit(:title,:lifeitem,:headline,:content,:detail,:checkcontent)
    end

end
