FactoryBot.define do
    factory :todo do
      sequence(:list) { |n| "TEST_NAME#{n}"}
    end
  end