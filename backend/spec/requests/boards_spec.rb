require 'rails_helper'

RSpec.describe "Boards", type: :request do

    describe "board test" do

        let!(:boards) {{boards: {
            posttitle:"title",
            postcontent:"content",
            username:"user"
        }}}
        

        it 'ユーザーが作成されること' do
            expect do
            post "/boards", params: boards
            expect(response.status).to eq(200)
            end
        end

        it "ユーザ取得" do
            get "/boards"
            expect(response.status).to eq(200)
        end

    end
end

