class LifepostsController < ApplicationController

    def index
        @lifepost = Lifepost.all
        render json:@lifepost
    end
    
    def show
        @lifepost = Lifepost.where(user_id: params[:id])
        render json:@lifepost
    end

    def create
        @user_id = User.find_by(username: session[:user_name]).id
        @lifepost = Lifepost.create(life_params.merge(user_id: @user_id))
        render json:@lifepost
    end

    def userpost
        @getpost = Lifepost.find_by(id: user_params[:id], user_id: user_params[:user_id])
        render json:@getpost
    end

    def update
        @updatelife = Lifepost.find(params[:id])
        @updatelife.update(
            title: life_params[:title],lifeitem: life_params[:lifeitem],
            headline: life_params[:headline],content: life_params[:content],
            detail: life_params[:detail],checkcontent: life_params[:checkcontent],
            image: life_params[:image]
        )
        render json:@updatelife
    end

    def destroy 
        @lifepost = Lifepost.find(params[:id])
        @lifepost.destroy
        render json:@lifepost
    end


    private

    def life_params
        params.require(:lifepost).permit(:title,:lifeitem,:headline,:image,:content,:detail,:checkcontent)
    end

    def user_params
        params.require(:userpost).permit(:id,:user_id)
    end

end
