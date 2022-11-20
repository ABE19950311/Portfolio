class CommentsController < ApplicationController

    def index
        @comment = Comment.all
        render json:@comment
    end

    def create
        @comment = Comment.create(comment_params)
        render json:@comment
    end

    private

    def comment_params
        params.require(:comments).permit(:lifepost_id,:user_id,:comment,:commentuser)
    end

end
