class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.all
  end
end
