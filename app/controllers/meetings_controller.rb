class MeetingsController < ApplicationController
  before_action :set_meeting, only: [:show, :edit, :update, :destroy]

  # GET /meetings
  # GET /meetings.json
  def index
    #@meetings = Meeting.find([params[:id]])
    @meetings = Array.new
    Meeting.all.each do |m|
      if m.user_id == current_user.id
        @meetings.push(m)
      end
    end
  end

  # GET /meetings/1
  # GET /meetings/1.json
  def show
  end

  # GET /meetings/new
  def new
    @meeting = Meeting.new
    #3.times { @meeting.decisions.build}
    #3.times { @meeting.criteria.build}
  end

  # GET /meetings/1/edit
  def edit
  end

  # POST /meetings
  # POST /meetings.json
  def create
    @meeting = Meeting.create(meeting_params)
    @meeting.user_id = current_user.id

    respond_to do |format|
      if @meeting.save
        format.html { redirect_to user_meetings_path, notice: 'Meeting was successfully created.' }
        format.json { render :show, status: :created, location: @meeting }
      else
        format.html { render :new }
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /meetings/1
  # PATCH/PUT /meetings/1.json
  def update
    respond_to do |format|
      if @meeting.update_attributes(meeting_params)
        format.html { redirect_to user_meeting_path, notice: 'Meeting was successfully updated.' }
        format.json { render :show, status: :ok, location: @meeting }
      else
        format.html { render :edit }
        format.json { render json: @meeting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /meetings/1
  # DELETE /meetings/1.json
  def destroy
    @meeting.destroy
    respond_to do |format|
      format.html { redirect_to user_meeting_path, notice: 'Meeting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meeting
      @meeting = User.find(params[:user_id]).meetings.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def meeting_params
      params.require(:meeting).permit(:name, decisions_attributes: [:id, :name, :meeting_id, :_destroy],
                                      criteria_attributes: [:id, :name, :meeting_id, :_destroy])
    end

  def decision_params
    params.require(:decision).permit(:name, :meeting_id)
  end

  def criterium_params
    params.require(:criterium).permit(:name, :meeting_id)
  end
end
