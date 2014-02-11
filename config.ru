Encoding.default_external = 'utf-8'
require 'debugger' if ENV['RACK_ENV'] == 'development'

require './app'
run ConCensus