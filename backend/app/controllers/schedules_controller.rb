class SchedulesController < ApplicationController
    
    def index
        @schedule = Schedule.all
        render json:@schedule 
    end

    def create
        @schedule  = Schedule.create(schedule_params)
        render json:@schedule 
    end

    def destroy
        @schedule  = Schedule.find(params[:id])
        @schedule .destroy
        render json:@schedule 
    end

    def destroy_all
        @schedule  = Schedule.destroy_all
        render json:@schedule 
    end

    private

    def schedule_params
        params.require(:schedules).permit(:list,:startdate,:duedate,:procedure)
    end
end
