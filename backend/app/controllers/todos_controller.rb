class TodosController < ApplicationController

    def index
        @user_id = User.find_by(username: session[:user_name]).id
        @todo = Todo.where(user_id: @user_id)
        render json:@todo
    end

    def create
        @user_id = User.find_by(username: session[:user_name]).id
        @todo = Todo.create(todo_params.merge(user_id: @user_id))
        render json:@todo
    end

    def destroy
        @todo = Todo.find(params[:id])
        @todo.destroy
        render json:@todo
    end

    def destroy_all
        @todo = Todo.destroy_all
        render json:@todo
    end

    private

    def todo_params
        params.require(:todos).permit(:list,:startdate,:duedate,:procedure)
    end
end
