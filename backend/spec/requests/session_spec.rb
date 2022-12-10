require 'rails_helper'

RSpec.describe "Session", type: :request do
    describe "session test" do
        before do
            @session = FactoryBot.create(:user)
        end

        context "new" do
            it "signin user" do
                signup @session
                get "/signup"
                expect(response).to be_successful
            end
        end


    end
end