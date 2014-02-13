desc 'Run the app'
task :s do
  system "rackup -p 9000"
end