## March 20th, 2023
Today we formed our groups and began brainstorming application ideas for our project. Through our collaboration, we decided to build an application which tracks a user's trips- a trip journal. We outlined what our MVP will be and began to design the CRUD layout.

## March 21st, 2023
On this current day, we did our standup during which each team member discussed what they had accomplished the previous day and their goals for the day ahead. Ray had worked on a wireframe design for the application the night before, which they presented. The team collaborated to add/include certain features. Our goal for tonight is to continue increasing our knowledge of FastAPI and additionally, to do research on MongoDB/PostgreSQL in the hopes that it will help us in coming to a consensus of which database to use for our application.

## March 23rd, 2023
Spoke to SEIRS about our project and shared wireframe. During the discussion, we discovered that it would be a good idea to have a "Welcome" page. From this page we would be able to login or signup for an account. The page would also contain a brief description and mockups of the features that the app offers. Perhaps in the footer we can include info about the team members as well. I added this idea to the wireframe and uploaded to our VSC file for the application.

I also worked on the API design and outlined some endpoints that I think will be necessary for the app. This will be shared with the team tomorrow during standup where we will all compare our notes about the API design and work together to create a draft of what we want them to look like.

## March 24th, 2023
Today we presented the updated wireframe with the "Welcome" page added on. We decided to also produce some mockups and put those on the welcome page as well. The team agreed on the draft (which does not have the mock-ups added on yet) so it was uploaded to our VSC file and pushed to GIT. For the rest of our allotted time, we came together and completed the API-design for our endpoints. All changes were pushed to GIT. Our collective goal for the upcoming weekend is to familiarize ourselves with FastAPI, MongoDB and creating issues with Git so that we are solid in our foundation and ready to begin our project next week.

## March 27th, 2023
Started on back end authorization. The page would also contain a brief description and mockups of the features that the app offers. Perhaps in the footer we can include info about the team members as well. I added this idea to the wireframe and uploaded to our VSC file for the application.

## March 29th, 2023
Today the back end authorization was finished. We decided to call it a day and watch explorations from the last few days so that we aren't behind and are familiar with the process so we can start coding the rest of the back end tomorrow

## March 30th, 2023
We did standup and assigned back end tasks to everybody however we decided it is probably best if one person just drives. We all contributed to the code and continued our project.The page would also contain a brief description and mockups of the features that the app offers. Perhaps in the footer we can include info about the team members as well.

## April 3rd, 2023
We finished all of the back end code today and tested it against our FastAPI Swagger browser. Everything works! The team decided to go back and review explorations for the rest of the week and start the front end after spring break.

## April 6th, 2023
I'm almost caught up on all of the explorations and lectures that I wanted to review. Spring break is next week.

## April 10th-14th, 2023
!!Spring Break!!

## April 17th, 2023
We have begun the front end! Today we followed our API design and created different react components and linked them.The team collaborated to add/include certain features. Our goal for tonight is to continue increasing our knowledge of FastAPI and additionally, to do research on MongoDB/PostgreSQL in the hopes that it will help us in coming to a consensus of which database to use for our application.

## April 20th, 2023
We've just been reviewing all of our code and fixing the bugs, making sure everything flows and there's no errors. We found out that Ray withdrew from the program today which was a huge bummer but the team charges onward.

## April 25th, 2023
We finished the front end! Also made sure everything is working correctly. Now we are integrating the design portion (what the user will see aka the aesthetics).

## April 28th, 2023
We went through our entire application and made sure it was functioning seamlessly. There was an issue with our logout function where the app was logging out and the token was being removed however when typing in the localhost:3000/trips path, the browser would pull up the home page even though the user was logged out. After some help from an instructor (Riley) we were able to figure out that the reason this was happening was because we were missing a line of code in the auth.js file, specifically the logout function. Everything got to working once that was fixed and now we are just waiting to submit.
