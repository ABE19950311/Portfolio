class BoardsController < ApplicationController
    def create
        @user_id = User.find_by(username: session[:username]).id
        @board = Board.create(board_params.merge(:user_id @user_id))
        render json:@board
    end
    
    private

    def board_params
        params.require(:boards).permit(:postdate,:posttitle,:postcontent,:username)
    end

end
