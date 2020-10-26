class Api::V1::CommentsController < Api::V1::BaseController
  before_action :load_task

  def create
    @comment = @task.comments.create(comment_params)
    @comment.user = current_user
    if @comment.save
      render status: :ok, json: { notice: "Comment added to the task successfully" }
    else
      render status: :unprocessable_entity, json: { errors: @comment.errors.full_messages }
    end
  end

  private
    def load_task
      @task = Task.find(comment_params[:task_id])
    end

    def comment_params
      params.permit(:content, :task_id)
    end
end
