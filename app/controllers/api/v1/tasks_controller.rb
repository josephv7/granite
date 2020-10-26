class Api::V1::TasksController < ApplicationController
  before_action :load_task, only: [:show, :update, :destroy]

  def index
    @tasks = Task.all
  end

  def show
    render
  end

  def update
    if @task.update(task_params)
      render status: :ok, json: { notice: "Successfully updated task." }
    else
      render status: :unprocessable_entity, json:{ errors: @task.errors.full_messages }
    end
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      render status: :ok, json: { notice: 'Task was successfully created' }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors  }
    end
  end

  def destroy
    if @task.destroy
      render status: :ok, json: { notice: "Successfully deleted task." }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  private

  def load_task
    @task = Task.find(params[:id])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end

  def task_params
    params.permit(:description, :user_id)
  end
end
