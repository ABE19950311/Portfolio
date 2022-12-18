class RegistrationsController < ApplicationController

    def index
        @user = User.all
        render json:@user
    end

    def signup
        @user = User.new(registrations_params)

        if @user.save
            render json: {status: :created, user: @user}
        else
            render json: {status:500}
        end
    end

    def update
        @updateuser = User.find_by(username: registrations_params[:username])
        @updateuser.update(password: registrations_params[:password], password_confirmation: registrations_params[:password_confirmation])
        render json:@updateuser
    end

    private

    def registrations_params
        params.require(:user).permit(:username, :password, :password_confirmation)
    end

end
