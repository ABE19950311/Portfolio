class MypagesController < ApplicationController

    def index
        @mypage = Mypage.all
        render json:@mypage
    end

    def create
        @mypage = Mypage.create(user_params)
        render json:@mypage
    end

    private

    def user_params
        params.require(:users).permit(:user_id)
    end

end
