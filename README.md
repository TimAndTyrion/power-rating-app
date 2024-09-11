# Power Ratinng App
I have created an app that allows a user to add Sports Franchises in a league to a database and rank them by Power Rating. Power Rating teams in a league is a method used by sportsbooks and handicappers to aid in handicapping sports.
Currently, the app allows the user to add NFL franchises, with plans to extend to all professional sports franchises in the future. 

# How was this application created:
I used .NET Core Web API to build the backend and Entity Framework (dbContext) for the database. React was used for the frontend. 

# Technologies I considered:
.NET and SQL DB were dictated, so the backend choice was clear. For the frontend, I considered using Blazor but, given the time constraints, I went with my go-to choice, React.

I also thought about using MUI to improve the site's appearance but decided against it as it would take over an hour to set up. The client side has no styling, as I chose to focus on functionality.

# Features I wanted to add / enhancements
As background, I chose to build a sports Power Rating app because I have a personal use case for it as a hobby. I have numerous spreadsheets of NCAA and NFL teams and always wanted to automate the process.

The next feature would allow users to select teams from the list and determine the spread of a contest based on Power Rating. For example, if one team is rated 90 and is playing at home against a team rated 89, the spread would be the difference between the numbers, factoring in home-field advantage, typically 2.5 points.

Another feature would be the ability to add contests to the database and generate advanced stats to help predict outcomes.

I'd like to seed the database with franchises in the future.  

Will NEED to put in unit testing and integration testing for both the API and APP.  

Also will need to work on the linters and formatters.

# How to run the Power Rating App
Everything is containerized, so running the code should be straightforward. 

## Run Power Rating API
The following steps will start up two containers: one for the SQL DB and one for the .NET Core Web API. The code for this is in another repository: https://github.com/TimAndTyrion/power-rating-ap1.
- Navigate to the 'power-rating-api' directory, which should contain the docker-compose.yml file.
- Run the command docker compose up -d.
- You should see two images and containers created for the SQL Server and the power-rating-api.
- Visit http://localhost:5000/swagger to interact with the API.

## Run Power Rating App
This is the React application for user interaction. 
- After pulling down the code, navigate to the 'power-rating-app' directory, which should also have a docker-compose.yml file.
- Run the command docker compose up -d.
- Once the services are up, visit http://localhost:3000 to start adding franchises. 
