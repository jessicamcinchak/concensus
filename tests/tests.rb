require './app'
require 'minitest/autorun'
require 'rack/test'

ENV['RACK_ENV'] = 'test'

class HelloWorldTest < MiniTest::Unit::TestCase
  include Rack::Test::Methods

  def app
    ConCensus
  end

  def test_can_reach_index
    get '/'
    assert last_response.ok?
    assert_equal "Hello, World!", last_response.body
  end

  def test_can_reach_map
  	get '/map'
  	assert last_response.ok?
  	assert_equal "Hello, World!", last_response.body
  end
end