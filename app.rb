# encoding: utf-8
require 'rubygems'
require 'bundler'
require 'sinatra'


class ConCensus < Sinatra::Base

	configure :development do
  	set :logging, false
	end

	get "/" do
	  haml :index
	end

	run! if app_file == $0
end