class SessionController < ApplicationController
  # use Rack::Flash
  def new
  # binding.pry
  end

  # def create
  #   if params[:provider] == 'github'
  #     #create or find user with github emaila and log them in
  #     @employer = Employer.find_or_create_by(email: auth['info']['email'])  do |u|

  #       u.name = auth['info']['name']
  #       u.email = auth['info']['email']
  #       u.password = SecureRandom.hex
  #     end
  #     # binding.pry
  #     session[:employer_id] = @employer.id
  #     redirect_to employer_path(@employer)
  #     # # render 'welcome/home'
  #   #    respond_to do |f|
  #   #   f.html { render :index, layout: false }
  #   #   f.json { render json: @jobs, status: 201 }
  #   # end
  #   end
  #   # binding.pry
  # end


  def new_employer
    render :new_employer, layout: false
    # binding.pry
  end

  def new_employee
    render :new_employee, layout: false
  end

  def create_employer
    @employer = Employer.find_by(email: params[:email])
    if @employer != nil && @employer.authenticate(params[:password])
      session[:employer_id] = @employer.id
      respond_to do |format|
        format.html {render 'employers/show', layout: false}
        # Binding.pry
        format.json { render json: @employer }
       end
    else
      flash[:message] = "Incorrect Email or Password."
      render :new_employer
    end
  end

  def create_employee
      # binding.pry
    @employee = Employee.find_by(email: params[:email])
    if @employee != nil && @employee.authenticate(params[:password])
      session[:employee_id] = @employee.id
      # binding.pry
      # redirect_to employee_path(@employee)
       respond_to do |format|
        format.html {render 'employees/show', layout: false}
        # Binding.pry
        format.json { render json: @employee }
       end
    else
      flash[:message] = "Incorrect Email or Password."
      render :new_employee
    end
  end

  def destroy
    session.destroy
    @current_user = nil
    redirect_to :root
  end

private
  def auth
    request.env['omniauth.auth']
  end
end
