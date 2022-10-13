FactoryBot.define do
    factory :user do
      sequence(:username) { |n| "TEST_NAME#{n}"}
      sequence(:password) { |n| "TEST_PASS#{n}"}
      sequence(:password_confirmation) { |n| "TEST_PASS#{n}"}
    end
  end