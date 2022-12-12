# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_27_105345) do
  create_table "boards", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "posttitle", null: false
    t.string "postcontent", null: false
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_boards_on_user_id"
  end

  create_table "comments", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "lifepost_id"
    t.string "comment", null: false
    t.string "commentuser", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lifepost_id"], name: "index_comments_on_lifepost_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "contacts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "contactpost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "hearts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_hearts_on_post_id"
    t.index ["user_id"], name: "index_hearts_on_user_id"
  end

  create_table "helpfuls", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "lifepost_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lifepost_id"], name: "index_helpfuls_on_lifepost_id"
    t.index ["user_id"], name: "index_helpfuls_on_user_id"
  end

  create_table "lifeposts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "title", null: false
    t.string "lifeitem", null: false
    t.string "headline", null: false
    t.binary "image"
    t.string "content", null: false
    t.string "detail", null: false
    t.string "checkcontent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_lifeposts_on_user_id"
  end

  create_table "mypages", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_mypages_on_user_id"
  end

  create_table "posts", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "board_id"
    t.string "username"
    t.string "postcontent", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_posts_on_board_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "todos", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id"
    t.string "list", null: false
    t.string "startdate"
    t.string "duedate"
    t.string "life"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_todos_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "boards", "users"
  add_foreign_key "comments", "lifeposts"
  add_foreign_key "comments", "users"
  add_foreign_key "contacts", "users"
  add_foreign_key "hearts", "posts"
  add_foreign_key "hearts", "users"
  add_foreign_key "helpfuls", "lifeposts"
  add_foreign_key "helpfuls", "users"
  add_foreign_key "lifeposts", "users"
  add_foreign_key "mypages", "users"
  add_foreign_key "posts", "boards"
  add_foreign_key "posts", "users"
  add_foreign_key "todos", "users"
end
