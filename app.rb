# encoding: utf-8
require 'rubygems'
require 'bundler'
require 'compass'
require 'sinatra'


class ConCensus < Sinatra::Base

	set :public_folder, Proc.new { File.join(root, '/app/assets') }

	configure :development do
  	set :logging, false
  	set :views, Proc.new { File.join(root, "/app/views") }
	end

	get "/" do
	  haml :index
	end

	get "/map" do
		haml :map
	end

	run! if app_file == $0
end