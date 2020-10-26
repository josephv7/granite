Rails.application.routes.draw do
  def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end

  draw :api
  draw :devise
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
