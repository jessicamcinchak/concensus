# ConCensus

## Making data visual



## Run Yourself

### Download ConCensus

This is a [Sinatra](http://www.sinatrarb.com/) app; make sure you have Ruby and rvm on your computer. Either download this project (and unzip) or `git clone` into the folder of your choice.

### Get things working

Using your terminal, in the ConCensus folder, do the following:
    bundle install  #install required gems
    bundle exec compass install bootstrap #install bootstrap as a Compass extension

### Starting ConCensus locally

Start the app by running:

    rake s

This rake command runs `bundle exec shotgun config.ru` behind the scenes for you and starts the app on Sinatra's default port 9393 and will now be able to view the application in your web browser at this URL [http://localhost:9393](http://localhost:9393).

You'll also want to open a new terminal window to the same directory and run `compass watch` to watch the Sass files for changes.

## Helper Rake Tasks

There are a few helper Rake tasks that will help you to clear and compile your Sass stylesheets as well as a few other helpful tasks. There is also a generate task, so you can generate a new project at a defined location based on the bootstrap.

    rake -T

    rake css:clear            # Clear the CSS
    rake css:compile          # Compile CSS
    rake css:compile:prod     # Compile CSS for production
    rake db:create            # create the database from config/database.yml from the current Sinatra env
    rake db:create_migration  # create an ActiveRecord migration
    rake db:drop              # drops the data from config/database.yml from the current Sinatra env
    rake db:migrate           # migrate the database (use version with VERSION=n)
    rake db:rollback          # roll back the migration (use steps with STEP=n)
    rake db:schema:dump       # dump schema into file
    rake db:schema:load       # load schema into database
    rake db:seed              # load the seed data from db/seeds.rb
    rake db:setup             # create the database and load the schema
    rake generate             # Generate a new project at dir=foo
    rake s                    # Run the app


## License

### SinatraBootstrap 
Copyright (c) Adam Stacoviak

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
