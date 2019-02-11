class EmployersController < ApplicationController
  before_action :current_user
  before_action :require_logged_in, except: [:new, :create, :home]

  # before_action :logged_in
  # skip_before_action :logged_in, only: [:new, :create]

  def new
    @employer = Employer.new
    render :new 
  end

  def create
    @employer = Employer.new(employer_params)
    if @employer.save
      session[:employer_id] = @employer.id
      redirect_to employer_path(current_user)
    else
      render :new
    end
  end

  def show
    @employer = Employer.find_by(id: params[:id])
    if  current_user != @employer
        redirect_to employer_path(@current_user)
    end
    respond_to do |format|
      format.html {render :show, layout: true }
      format.json {render json: @employer }
    end
  end



  private
    def employer_params
      params.require(:employer).permit(:name, :uid , :email, :password)
    end

end