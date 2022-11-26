class SessionsController < ApplicationController
    before_action :set_csrf_token_header, only: [:login,:sessionid]

    def login
        @user = User.find_by(username: session_params[:username])

        if @user && @user.authenticate(session_params[:password])
            session[:user_name] = session_params[:username]
            render json: {logged_in: true, user:@user}
        else
            render json: {logged_in: false}
        end
    end

    def logout
        @current_id = User.find_by(username: session[:user_name]).id
        reset_session
        cookies.delete(:current_id)
        render json: {status: 200, logged_out: true }
    end

    def usercheck
        @user = User.find_by(username: session_params[:username])

        if @user && @user.authenticate(session_params[:password])
            render json:{status: true}
        else
            render json:{status: false}
        end
    end

    def sessionid
        @existid = User.where(username: session[:user_name]).exists?
        if @existid
            @current_id = User.find_by(username: session[:user_name]).id
            render json:{state: :login,id: @current_id}
        else
            render json:{state: :logout}
        end
    end

    def sessionname
        @session_name = session[:user_name]
        render json:@session_name
    end

    private

    def session_params
        params.require(:user).permit(:username,:password)
    end
end
