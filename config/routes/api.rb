namespace :api do
  namespace :v1 do
    resources :tasks, only: [:index, :create, :show, :update, :destroy]
  end
end
