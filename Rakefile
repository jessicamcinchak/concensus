require "sinatra/activerecord/rake"
require 'rubygems'
require 'bundler'
require 'rake'


Bundler.setup

Dir["tasks/*.rake"].sort.each { |ext| load ext }

APP_FILE  = 'app.rb'
APP_CLASS = 'Sinatra::Application'

require 'sinatra/assetpack/rake'