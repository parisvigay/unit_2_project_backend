# TuneIn project

**Overview:**

TuneIn is a music-based social media web app, centred around recommending music and consuming music recommendations. It was my first full stack web app, and was made using Vue.js for the frontend, and Node js and Express for the backend. I also incorporated Bootstrap.

**Day 1**

Day 1 for me was about the initialization and set up of my project. For the frontend, I altered the structure of App.vue to include routing components, using Vue Router and implemented routing for different views (home, add content). I also added and styled components e.g. AddContent.vue, HomeView.vue, and NavView.vue, and  styled elements for user interaction (adding songs, artists, and albums) and navigation. In terms of form handling & API requests, I implemented forms for adding songs, artists, and albums; integrated form validations using regex patterns; and setup API endpoints (POST requests) to the backend server. In terms of styling, I integrated navigation icons for user interaction and included global styles for body formatting. 
For the backend, I configured the Express server and set up a MongoDB connection using Mongoose with provided environment variables, defined schemas for artists, songs, and albums, and implemented a POST route for adding songs with logic to check and create associated artists if they don't exist.

**Day 2**

For the frontend,  I adjusted some visual aspects for a more polished appearance. I spent a fair amount of time tinkering with and refining the styling. On the landing page, I tweaked the title to be animated for a more visually engaging experience. I also added a navigation icon for seamless transitions between pages. I introduced a new profile view component with placeholders for user-related information. There’s a basic structure for the user profile view for me to build on.
For the backend, I created an endpoint for adding or updating artists within the backend. The goal was to manage artist data efficiently based on incoming requests.
I added logic to check if the artist exists before adding or updating.

**Day 3**

For the frontend, I introduced dynamic content updates upon successful submission, in the add content vue, providing visual feedback to the user. I improved the styling on the landing page. In the profile vue, I styled the profile card and information placeholders to maintain consistency with the overall design. And generally, I continued to refine styles, ensuring consistency and a visually appealing user interface across different views.
For the backend, I focused on the ‘users’ side of things. I introduced a user schema, and implemented an endpoint (POST /add/user) for user addition or update, ensuring uniqueness of users by checking if the email already exists in the database before creating a new user or updating the last login timestamp. In addition to this, I created an endpoint (GET /users) to retrieve a list of all users stored in the database.

**Day 4**

For the frontend, I enhanced the behaviour on the AddContent component, managing user interaction more effectively. I modified the component's methods to include the current user’s email address in the submission.  I also worked on the ProfileView component, allowing users to add their favourite songs, artists, and albums, submitting these favourites to the backend server, and added a new route (UpdateFavourite) for updating user favourites, enabling users to edit their previously submitted favourites. I continued refining the styling across views for a consistent and visually appealing UI. I also managed to enhance the SocialView component to display recommended songs, artists, and albums.
For the backend, I implemented endpoints (/add/favourite, /favourites/:id) to handle user favourites, allowing users to add, update, and retrieve their favourite songs, artists, and albums. I also added an endpoint (/all-favourites) to retrieve all favourites stored in the database. In terms of schemas and models, I introduced a new ‘favouriteSchema’ to manage user favourites and modified the existing schema for artists, songs, and albums to accommodate relationships and additional data handling. I also created a model for the new schema. Additionally, I refactored endpoint responses for /artists, /songs, and /albums to include the population of user details alongside the respective content (artist, song, album).
And in terms of all the endpoints, I updated them from local host, insteading using an env file, ready for deployment.

**Day 5**

For Day 5, I focused on refining the social interaction components within the frontend. I renamed SocialView.vue to RecommendationsView.vue  for a more accurate description of its purpose as I decided to have two ‘social’ pages, one for recommendations and one for profiles and now needed a ‘social navigation page’ (SocialPage.vue) before either of them. I styled the layout of RecommendationsVue for a better visual appeal and user experience. For the other social page, I developed a UserProfiles.vue component to showcase user profiles and their favourite songs, artists, and albums. 
In terms of the backend, Not much changed. I updated the endpoint to retrieve all favourites to populate the user to make it possible to work within the frontend.

**Day 6**

Day 6 primarily focused on refining the RecommendationsView.vue component to enhance user interactions and improve visual appeal. I enhanced the layout and display of recommended songs, artists, and albums and refined the presentation of each song, artist, and album. I also implemented a deletion feature allowing users to remove their own recommendations, by checking the current logged in user with the user who made the recommendation. Within this, I Incorporated conditional styling to display delete buttons as invisible only for content recommended by the current user. I also tried to clean up my code and make it more concise by structuring the methods for deleting songs, artists, and albums, following best practices for API interaction.
In terms of the backend, I incorporated routes to allow for song, artist and album deletions.

**Day 7**

Day 7 saw refinements primarily focusing on the AddContent.vue and RecommendationsView.vue components. Generally, not much changed as it was the day of presentations. I enhanced form input validations by editing a couple of the regex patterns within the AddContent vue. In terms of RecommendationsView, I updated the conditional styling to display delete buttons as active (not disabled), rather than invisible to stop users from being able to click them despite them not being visible.
