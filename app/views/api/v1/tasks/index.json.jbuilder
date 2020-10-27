json.tasks @tasks do |item|
  json.id item.id
  json.title item.title
  json.description item.description
  json.userId item.user_id
  json.userName item.user.user_name
  json.creatorId item.creator_id
  json.creatorName User.find_by_id(item.creator_id).user_name
end