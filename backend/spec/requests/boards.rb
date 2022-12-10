require 'rails_helper'

RSpec.describe "Boards", type: :request do
    describe "board test" do
        before do
            @board = FactoryBot.create(:board)
        end
    end
end

