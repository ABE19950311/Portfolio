require 'rails_helper'

describe "GET /todos" do
    before do
        create_list(:todo, 10)
    end
    it 'ユーザー一覧が表示されること' do
        get "/todos"
        expect(response.status).to eq(200)
    end
end