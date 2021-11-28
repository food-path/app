# Food Path App

## Overview

Implement an application for planning a food-centric trip as a PWA (progressive web app) that allows users to filter their desired food experience based on budget, location, and dietary considerations. The main focus will be an interactive app showing an itinerary of eateries that the user can save.

## MVP

The PWA should support logged in users. Users should be able to fill out a form with their itinerary preferences and be able to interact with a provided map and list of the selected restaurants. Users should also be able to click on a specific restaurant and be taken to a detail page for that restaurant. Users will be able to save their itinerary and view any saved itineraries offline.

- [X] db for user models
- [X] db for restaurants
- [X] db for foodiemap
- [X] seed file
- [X] user filters what they want to see: location, restaurant type, rating, budget, dietary considerations
- [X] populates map with choices
- [X] user can check a specific restaurant 
- [X] new user can sign up
- [X] member can sign in, see profile, add friends, share maps with friends, save and delete maps
- [X] new user can sign up with Google
- [X] member can sign in with Google
- [X] member is greeted with a welcome message on search page, confirming they are logged in
- [X] user can edit their profile
- [X] two views only available to user who is not a member
- [X] if nothing added to the search or typo, show an error pop up with specific message
- [X] when content slow to load, a "loading burrito" can be seen


## Stretch Goals

Ensure our app is widely accessible to a broad demographic of users:

- support languages other than English & allow users to choose their preferred language when creating an account
- tag features to work with voice control systems
- all images include alt text in the codebase

Incorporate extra features into a user's profile such as:

- share their itinerary
- favorite or rate saved itineraries
- favorite or rate single restaurants from an itinerary

Incorporate extra features into the initial itinerary creation & view such as:

- switch out a single restaurant from a provided itinerary
- make a reservation through the app for a single restaurant
- enable a "near me" feature that allows for more specific location restrictions (ie. zipcode)

## Technical Challenges

- Mobile development
- Filtering the suggested list of restaurants based on ratings
- Building a database of restaurants with all desired information (especially dietary considerations)
- Connecting with external APIs (Yelp, Google, Instagram)


---------------------------------------
PWA REQUIREMENTS (link: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

1. Necessary Features
In order to call a Web App a PWA, technically speaking it should have the following features: Secure contexts (HTTPS), one or more Service Workers, and a manifest file. 

- [x] Secure contexts (HTTPS) - link: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts
The web application must be served over a secure network. Being a secure site is not only a best practice, but it also establishes your web application as a trusted site especially if users need to make secure transactions. Most of the features related to a PWA such as geolocation and even service workers are available only once the app has been loaded using HTTPS.

- [x] Manifest file - Link: https://developer.mozilla.org/en-US/docs/Web/Manifest
A JSON file that controls how your app appears to the user and ensures that progressive web apps are discoverable. It describes the name of the app, the start URL, icons, and all of the other details necessary to transform the website into an app-like format.

- [ ] Service workers - Link: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
A service worker is a script that allows intercepting and control of how a web browser handles its network requests and asset caching. With service workers, web developers can create reliably fast web pages and offline experiences.

