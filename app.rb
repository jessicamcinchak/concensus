# encoding: utf-8
require 'sinatra'
require 'sinatra_boilerplate'

set :js_assets, %w[underscore.js]

configure :development do
  set :logging, false
end

class SinatraBootstrap < Sinatra::Base

	get "/" do
	  haml :index
	end
end