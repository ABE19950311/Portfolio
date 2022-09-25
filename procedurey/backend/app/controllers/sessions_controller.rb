class SessionsController < ApplicationController
    def login
        @user = User.find_by(username: session_params[:username])

        if @user && @user.authenticate(session_params[:password])
            session[:user_name] = session_params[:username]
            render json: {logged_in: true, user:@user}
        else
            render json: {status:401,errors:["認証に失敗しました。","正しいユーザ名・パスワードを入寮し直すか、新規登録して下さい"]}
        end
    end

    def logout
        reset_session
        render json: {status: 200, logged_out: true }
    end

    def logged_in?
        @current_user ||= User.find_by(username: session[:user_name])
        if @current_user
            render json: {logged_in:true, user:@current_user}
        else
            render json: {logged_in:false, message:"ユーザが存在しません"}
        end
    end

    private

    def session_params
        params.require(:user).permit(:username,:password)
    end
end
