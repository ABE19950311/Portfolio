class ContactsController < ApplicationController

    def show 
        @contact = Contact.where(user_id: contact_params[:user_id])
        render json:@contact
    end

    def create
        @contact = Contact.create(contact_params)
        render json:@contact
    end

    private

    def contact_params
        params.require(:contacts).permit(:user_id,:contactpost)
    end

end
