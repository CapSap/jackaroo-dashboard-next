# Jackaroo Dashboard

## Description

This is a quick a dirty web dashabord to aggregate and display some data. Version 0.1 will require the user to upload a csv, but in a later version I hope to automate this. Next.js was chosen with a desire to get something up and deployed quickly, and a supabase database.

## MVP (minimum viable product)

- accept some user data (csv file upload)
- insert data into a database
- aggregate and display data

## Challenges

I had a brief attempt at using IBM's react carbon components for styling, but I gave up. I was not able to get a navbar working.

## How to run

0. You will need some .env variables to connect to the databse
1. Clone the repo `git clone git@github.com:CapSap/jackaroo-dashboard-next.git`
2. install dependencies `npm install`
3. npm run dev to start a dev server

## Next steps

- I'd like to automate the data upload. I've messed about with pupateer on a seperate project, but I'm not sure how exactly to handle the file that is downloaded, how to read it.
- I'd also like to add some graphics, but I'll need to gather user feedback first to find out what will be useful to display
- Some auth would be a good idea
