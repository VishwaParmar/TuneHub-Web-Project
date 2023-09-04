
# TuneHub Application

* *Date Created*: 08 August 2023
* *Last Modification Date*: 08 August 2023
* *Requirements URL*: <https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608545/View>
* *Git URL*: <https://git.cs.dal.ca/hppatel/csci-5709-grp-05>
*  *Netlify Deployment URL*: <https://tune-hub.netlify.app/>
*  *Render Deployment URL*: <https://tunehub-server.onrender.com>
## Authors
* [Dev Patel](dev.patel@dal.ca) - *(Developer)*
* [Harsh Pranav Patel](hr979846@dal.ca) - *(Developer)*
*  [Kainat Khan](Kainat@dal.ca) - *(Developer)*
* [Preeti Sharma](pr233584@dal.ca) - *(Developer)*
* [Vishwa Pankajbhai Parmar](vs623903@dal.ca) - *(Developer)*

## Deployment

Deployed on Netlify and Render using a clone repository from GitHub.
Front-end deployed on Netlify with a deployment trigger on master branch.
Back-end deployed on Render with a deployment trigger on master branch.

## Built With

* [React JS](https://react.dev/) - The web framework used
* [Express JS](https://react.dev/) - Node framework for building REST apis
* [Node](https://nodejs.org/en) - Dependency Management
* [Chakra UI](https://chakra-ui.com/) - Predefined React Components
* [Spotify web apis (OAuth 2.0)](https://developer.spotify.com/documentation/web-api) - APIs to support Spotify integration

## Sources Used
### ContactUs.js
*Lines ## 41 ##*
```
const  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```
Regex was taken from [Oreilly](https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s01.html)

### /server/index.js
*Lines ## 67 - 180 ##*
Implementation of Spotify OAuth2.0 is referenced from [Spotify authorization guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) and [examples.](https://github.com/spotify/web-api-auth-examples)

### /src/spotify-integration/SpotifyIntegration.js
All the calls to Spotify apis are referenced from [Spotify Web apis documentation.](https://developer.spotify.com/documentation/web-api)

### /src/components/AdminComponent/AddSongForm.js
*Lines ## 319 - 331 ##* 
Implementation of encoding an image to base64 format is referenced from [How to store an image to a database with React using Base 64](https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f), which will allow us to store the image information in the database in the form of encoded string that can be later retrieved.

### /src/components/AdminComponent/AddArtistForm.js
*Lines ## 247 - 259 ##* 
Implementation of encoding an image to base64 format is referenced from [How to store an image to a database with React using Base 64](https://medium.com/nerd-for-tech/how-to-store-an-image-to-a-database-with-react-using-base-64-9d53147f6c4f), which will allow us to store the image information in the database in the form of encoded string that can be later retrieved.

##  File Structure
### Backend:
/server/index.js : Main entry point
/server/routes: Defines the available routes
/server/controllers: Contains the business logic
/server/models: Contains the MongoDB models to interact with the database
### Frontend:
/src/index.js: Main entry point
/src/spotify-integration: Contains api logic related to Spotify integration
/src/assets: Contains the images (.png and .svg)
/src/components: Contains custom made reusable React components
/src/pages: Contains the UI pages
/src/services: Contains the api calls to the backend

## Acknowledgments
Special thanks to:
[@TheNetNinja](https://www.youtube.com/watch?v=iXsM6NkEmFc&list=PL4cUxeGkcC9hcnIeryurNMMcGBHp7AYlP) on YouTube for Chakra-UI tutorials.
Spotify for providing their APIs for free and for such comprehensive [documentation.](https://developer.spotify.com/documentation/web-api)
Professor and TAs for the awesome lectures and tutorials.
