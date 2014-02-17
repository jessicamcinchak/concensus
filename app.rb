require 'rubygems'
require 'sinatra/base'
require 'sinatra/assetpack'
require 'haml'

class ConCensus < Sinatra::Base

	register Sinatra::AssetPack
	assets do |a|
		serve '/js', :from => 'assets/javascripts'
		js :application, [
    	'/js/*.js'
  	]

  	serve '/css', :from => 'assets/stylesheets'
  	css :application, [
    	'/css/jqueryui.css',
    	'/css/reset.css',
    	'/css/foundation.sass',
    	'/css/app.sass'
   	]

	end

  get '/' do
    haml :index
  end

  get '/map' do
  	haml :map
  end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
