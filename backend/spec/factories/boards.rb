FactoryBot.define do
    factory :board do
        Faker::Config.locale = :ja
        association :user  #外部キー？
        posttitle { Faker::Book.title }
        username { Faker::Name.name }
        postcontent { Faker::Lorem.paragraph }
    end
end
