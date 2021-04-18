# Money Tabs

## What is it

I originally made this app using pure HTML, CSS and js. I am now in the process of doing this properly and using ReactJS
in the process as this should make it easier to design the app. I am planning on making this a PWA meaning it works like
a native app and can be installable like one too but has the storage space of a web app i.e. basically non-existent. To
learn more about [PWAs](https://web.dev/progressive-web-apps/) read here. The app should in the end allow you to add
your friends as tabs for items they owe you for. Scenario, you head to a bar with your mates, one of your mates says
they can't buy tonight but if you lend them some money they'll pay you back in the future. What you would do is, open
the app, add your friend as a tab either by searching for them (if they have an account on the app) or by adding them
manually. Then you can see how much they owe you and you can keep adding to the tab both ways either you owe them or
they owe you. By the end, group tabs functionality should be there too, something like a money pool, where you and your
friends save up for something e.g. a holiday.

## How to use it

Currently not deployed but can be run locally.

### To run locally

1. Install either LAMP/WAMP/XAMPP on your desired OS
2. Install Node and npm
3. Clone repo `git clone https://github.com/rodude123/moenytabs.git`
4. Open cmd/terminal window at project root and type `npm build`
5. move contents of build folder to webserver root e.g. `/var/www` or `/srv/http` or `C:\wamp64\www` or `C:\XAMPP\www` etc.
6. Go to `localhost` in your browser and the app is ready to use

Right now there is nothing much the app can do but it's there.

## Want to contribute

Please, if you want to contribute, be my guest but follow these simple rules.

* This is an app that I originally had the idea for but if you think some new app feature is required I'll be happy to
  take a look at it and merge it in if it looks good(code wise).
* Most likely I'll approve of new features but just in case I'll go over the pull request.
* Please try to follow the code formatting and structure, if you don't it's not the end of the world, I'll be converting
  them if they do not match.

You're free to use any IDE for this project although I use PHPStorm (but that's a different question and whole other
story as to why)

### Getting started

1. Fork repo
2. Install either LAMP/WAMP/XAMPP on your desired OS
3. Install Node and npm
4. Clone your forked repo `git clone https://github.com/{your name here}/moenytabs.git`
5. Move all contents of the public directory to webserver root e.g.
6. Open cmd/terminal window at projoect root and type `npm start`
7. Go to `localhost:3000` in your browser and the app is ready to be built on.

Now go forth and build!

## Tech used

### Frontend

* ReactJS
* Material UI
* Workbox (for the eventual PWA part)

### Backend

* PHP
* MySQL/MariaDB

## Thank you

Thank you for reading this and getting this far. If you like the app idea, please feel free to star it. You're **cool**
for getting this far!
