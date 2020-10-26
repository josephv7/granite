class AddCreatorIdToTask < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :creator_id, :integer
  end
end
