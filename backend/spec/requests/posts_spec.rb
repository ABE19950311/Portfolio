require 'rails_helper'

describe "GET /getuser" do
    before do
        create_list(:user, 10)
    end
    it 'ユーザー一覧が表示されること' do
        get "/getuser"
        expect(response.status).to eq(200)
    end
end