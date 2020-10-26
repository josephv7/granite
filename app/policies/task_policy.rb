class TaskPolicy
  attr_reader :user, :task

  def initialize(user, task)
    @user = user
    @task = task
  end

  def show?
    task.creator_id == user.id || task.user_id == user.id
  end

 
  def edit?
    show?
  end

  def update?
    show?
  end

  def create?
    true
  end

  def destroy?
    task.creator_id == user.id
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(creator_id: user.id).or(scope.where(user_id: user.id))
    end
  end
end