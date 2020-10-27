require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  def test_is_instance_of_task
    task = Task.new
    assert task.is_a?(Task)
  end

  def test_value_of_description_assigned
    task = Task.new(description: "Description assigned for testing")

    assert_equal "Description assigned for testing", task.description
  end

  def test_value_created_at
    task = Task.new(description: "This is a test task")
    assert_nil task.created_at
  
    task.save!
    assert_not_nil task.created_at
  end
end
