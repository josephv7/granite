class TaskLoggerJob < ApplicationJob
  queue_as :default

  def perform(task)
    puts "Created a task with following attributes :: #{task.attributes}"
  end
end
