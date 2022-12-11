require 'rails_helper'

RSpec.describe "Session", type: :request do

    describe "session test" do

        # before do
        #     @user_create_params = {
        #     user: {
        #         id: 1,
        #         username:"user",
        #         password:"pass",
        #         password_confirmation:"pass"
        #     }
        #     }
        # end
        
        let!(:user) {{user: {
            username:"user",
            password:"pass",
            password_confirmation:"pass"
        }}}
        
        # let!(:newuser) {{user: {
        #     username:"user",
        #     password:"newpass",
        #     password_confirmation:"newpass"
        # }}}

        it 'ユーザーが作成されること' do
            expect do
            post "/signup", params: user
            expect(response.status).to eq(200)
            end.to change {User.count}.by(1)
        end

        it "ユーザ取得" do
            get "/getuser"
            expect(response.status).to eq(200)
        end

        # it "パスワード変更" do
        #     expect do
        #         patch :update, params: newuser
        #     end.to change{user.reload.password}.from("pass").to("newpass")
        # end
    


        # before 'ユーザーIDをセッションから取り出せるようにする' do
        #     allow_any_instance_of(ActionDispatch::Request)
        #     .to receive(:session).and_return(user_id: user.id)
        # end
    
        # it '/hoge が成功してユーザー情報が○○する' do
        #     get '/hoge'

        #     expect(response).to be_successful
        #     expect(User.find user).to have_attributes(
        #     hoge: 'fuga'
        #     )
        # end

    end
end
