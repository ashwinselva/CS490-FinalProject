# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. npm install -g heroku
2. Create a Heroku app: `heroku create --buildpack heroku/python`
3. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
4. Create Config Vars key GOOGLE_CREDENTIALS and paste the content of service account credential JSON file as is.
5. Create a key under Config Vars GOOGLE_APPLICATION_CREDENTIALS and set a value as google-credentials.json.
6. The script with generate a file called google-credentials.json which holds the key from the step #4 above. 
7. Push to Heroku: `git push heroku main`

## Heroku Link
https://morning-tundra-46477.herokuapp.com/
