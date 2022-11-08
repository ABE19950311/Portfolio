class PostsController < ApplicationController
    
    def index
        @post = Post.all
        render json:@post
    end

    def mypost
        @user_id = User.find_by(username: session[:user_name]).id
        @post = Post.where(user_id: @user_id)
        render json:@post
    end

    def create
        @post = Post.create(post_params)
        render json:@post
    end

    private

    def post_params
        params.require(:posts).permit(:username,:postcontent,:board_id,:user_id)
    end

end
