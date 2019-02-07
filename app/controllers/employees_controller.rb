class EmployeesController < ApplicationController
  before_action :current_user
  before_action :require_logged_in, except: [:new, :create]

  # before_action :logged_in
  # skip_before_action :logged_in, only: [:new, :create]

	def new
		
    @employee = Employee.new
    render :new, layout: false
		# respond_to do |format|
		# 	format.html {render :new, layout: false}
		# 	format.json {render json: @}
		# end 
  end

	def create
    @employee = Employee.new(employee_params)

    if @employee.save
      session[:employee_id] = @employee.id
      
			# redirect_to employee_path(@employee)
			
      respond_to do |format|
        format.html {render 'employees/show', layout: false}
        format.json {render json: @employee}
      end
    else
      render :new
    end
  end

  def show
  @employee = Employee.find_by(id: params[:id])
    if  current_user != @employee
      redirect_to employee_path(@current_user)
    end
      respond_to do |format|
        format.html {render :show, layout: false}
        format.json { render json: employee_path(@current_user) }
      end
  end

private
  def employee_params
    params.require(:employee).permit(:name, :uid , :email, :profession, :password)
  end

  def employee_session
      session[:employee_id] = @employee.id
  end

end