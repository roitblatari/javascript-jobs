class EmployersController < ApplicationController
  before_action :current_user
  before_action :require_logged_in, except: [:new, :create]

  # before_action :logged_in
  # skip_before_action :logged_in, only: [:new, :create]

  def new
    @employer = Employer.new
    render :new, layout: false
  end

  def create
    @employer = Employer.new(employer_params)
    if @employer.save
      session[:employer_id] = @employer.id
      # redirect_to employer_path(current_user)
      respond_to do |format|
        format.html { render 'employers/show', layout: false }
        format.json { render json: @employer }
      end
      
    else
      render :new
    end
  end
  	
  

#  def show
#   @employee = Employee.find_by(id: params[:id])
#     if  current_user != @employee
#       redirect_to employee_path(@current_user)
#     end
    
#   end
  
  def show
    @employer = Employer.find_by(id: params[:id])
    if  current_user != @employer
        redirect_to employer_path(@current_user)
    end
  
  end



  private
    def employer_params
      params.require(:employer).permit(:name, :uid , :email, :password)
    end

end