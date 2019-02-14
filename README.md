# IronFood App --- Where you can find your best meal experience around IronHack Sao Paulo!

IronFood is a colaborative aplication developed for all Ironhackers from Sao Paulo campus who are looking for good food around the school.
Ironhack students can search for a restaurant by food type and/or the maximum amount of money they want to spend. They can also add new restaurants in the aplication and place comments about each meal experience.

## Acknowledgments

As our first Full Stack project after just 1 month of study, we would like to let a HUGE thanks to our beloved teacher, TAs, all ironhack staff and our classmates for the support, patience and funny moments during this challenging week!! ♥‿♥

## Getting Started

The aplication is deployed in Heroku and can be acessed anytime by acessing the below link:

* Ironfood app => [CLICK HERE](https://ironfood.herokuapp.com).

## Prerequisites

No hardware prerequisites and no instalation needed. This aplication works 100% online and can be accessed in any device (100% responsive!).

## How to navigate

This app is very intuitive and easy to navigate. By accessing its home page you can either access the full restaurant list or look for specific restaurants based on how much you can spend and what do you want to each.
You can also create an account to be able to add new restaurants to the aplication and place comments about each meal experience you had.
By subscribing you'll have access to your profile page, where you can manage your account and also edit/delete the comments you placed previously.

## Additional implementations and improvements

Althouth the app is fully functional, improvements can be made to increase user's experience:

* Add a rating grade to each restaurant and show search results by the highest to lowest grade.
* Implement email comunication with user (signup and comment submisstion confirmation).
* Implement a "password recovery" route for users who forget their password.
* Implement an admin role to moderate the information being added to the aplication and adjust access priviledges.
* Improove google maps interations (show restaurant information by clicking on its marker location at google maps).

## Contributing

Please feel free to fork/clone this repo to look deeper into the logics of our app and contribute with some of the above improvements if you like :-)
By forking this repo, use '$ npm install' in your terminal to add all dependencies needed. You will also need to create a ".env" file in your root folder and add some keys:
* PORT=YOUR_LOCALHOST_ACCESS_PORT
* CLOUDINARY_KEY=YOUR_CLOUDINARY_KEY
* CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
* CLOUDINARY_SECRET=YOUR_CLOUDINARY_SECRET
* MONGODB_URI=mongodb://localhost/YOUR_COLLECTION_NAME_IN_MONGODB

Since we are using google maps API in some views, you need to place your own API key. In "restaurant-details.hbs", "restaurants.hbs" and "search.hbs" views there's a SCRIPT TAG with google API url which you'll need to place your own KEY, as showed below:
* https://maps.googleapis.com/maps/api/js?key=**PLACE_YOUR_API_KEY_HERE**&callback=initOne

## Authors & Version Control

App developed by **Henrique Guazzelli Mendes - https://github.com/henriquegmendes** and **Mariana Dobal - https://github.com/mmdobal** - *IronFood App Version 0.1* - **Published in Feb-14th of 2019**
