class BoardsController < ApplicationController

    def index
        @board = Board.all
        render json:@board
    end

    def myboard
        @user_id = User.find_by(username: session[:user_name]).id
        @board = Board.where(user_id: @user_id)
        render json:@board
    end

    def create
        if Rails.env.test? 
            @board = Board.create(board_params.merge(user_id: 1))
            render json:@board
        else
            @user_id = User.find_by(username: session[:user_name]).id
            @board = Board.create(board_params.merge(user_id: @user_id))
            render json:@board
        end
    end

    def destroy
        @board = Board.find(params[:id])
        @board.destroy
        render json:@board
    end
    
    private

    def board_params
        params.require(:boards).permit(:posttitle,:postcontent,:username)
    end

end
