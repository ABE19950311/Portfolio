FactoryBot.define do
    factory :user do
        Faker::Config.locale = :ja
        username {Faker::Name.name}
        password {"testpass"}
        password_confirmation {"testpass"}
    end
end
