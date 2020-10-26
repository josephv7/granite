class MakeDescriptionNotNullable < ActiveRecord::Migration[6.0]
  def change
    change_column_null :tasks, :description, false
  end
end
