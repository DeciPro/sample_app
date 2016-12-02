# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161126171243) do

  create_table 'criteria', force: :cascade do |t|
    t.integer 'meeting_id'
    t.string 'name'
    t.integer 'weight'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['meeting_id'], name: 'index_criteria_on_meeting_id'
  end

  create_table 'decisions', force: :cascade do |t|
    t.integer 'meeting_id'
    t.string 'name'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['meeting_id'], name: 'index_decisions_on_meeting_id'
  end

  create_table 'meetings', force: :cascade do |t|
    t.string 'name'
    t.integer 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_meetings_on_user_id'
  end

  create_table 'participantinputs', force: :cascade do |t|
    t.integer 'participant_id'
    t.integer 'decision_id'
    t.integer 'criterium_id'
    t.integer 'weight'
    t.integer 'value'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['criterium_id'], name: 'index_participantinputs_on_criterium_id'
    t.index ['decision_id'], name: 'index_participantinputs_on_decision_id'
    t.index ['participant_id'], name: 'index_participantinputs_on_participant_id'
  end

  create_table 'participants', force: :cascade do |t|
    t.string 'name'
    t.string 'email'
    t.integer 'meeting_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['meeting_id'], name: 'index_participants_on_meeting_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'name'
    t.string 'email'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'password_digest'
    t.boolean 'admin'
    t.index ['email'], name: 'index_users_on_email', unique: true
  end

end
