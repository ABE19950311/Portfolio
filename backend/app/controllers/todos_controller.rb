class TodosController < ApplicationController
    def index
        @todo = Todo.all
        render json:@todo
    end

    def create
        @todo = Todo.create(todo_params)
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
