class AddForeignKeyToTask < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :tasks, :users, column: :user_id, on_delete: :cascade
  end
end
