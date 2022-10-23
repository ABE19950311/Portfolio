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

    private
    
    def registrations_params
        params.require(:user).permit(:username, :password, :password_confirmation)
    end
end
