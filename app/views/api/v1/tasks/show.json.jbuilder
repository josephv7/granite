json.id @task.id
json.title @task.title
json.description @task.description
json.creatorId @task.creator_id
json.creatorName User.find_by_id(@task.creator_id).user_name
json.userId @task.user_id
json.userName @task.user.user_name
json.comments @comments