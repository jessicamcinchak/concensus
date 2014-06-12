require 'rubygems'
require 'sinatra/base'
require 'haml'

class ConCensus < Sinatra::Base

  get '/' do
    haml :index
  end

  get '/map' do
  	haml :map, :layout => false
  end

  get '/underconstruction' do
  	haml :underconstruction
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
