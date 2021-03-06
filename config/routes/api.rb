namespace :api do
  namespace :v1 do
    resources :tasks, only: [:index, :create, :show, :update, :destroy] do
      resources :comments, only: [:create]
    end
    resources :users, only: [:index]
  end
end
