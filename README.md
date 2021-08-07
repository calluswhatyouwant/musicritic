# Musicritic

Musicritic wants to become your personal music-specific Metacritic. You'll be able to rate the music you listen to, read other people's opinions and help create a healthy community of music lovers!

## Table of Contents

- [Features](#features)
- [Community](#community)
  - [Running locally](#running-locally)
  - [Suggest a new feature or report a bug](#suggest-a-new-feature-or-report-a-bug)
  - [Do it yourself](#do-it-yourself)
  - [Maintainers](#maintainers)

## Features

Musicritic has still got a long way to go, but here are some things you can already do!

- Connect yourself to Spotify (required to make use of the rest of the features!);
- Check your recently listened to tracks and recent top tracks;
- Look up albums, tracks, artists, and playlists;
- See more information on tracks and albums in specific pages.

## Community

So you want to help us? How kind of you! Just know you can contribute in many ways.
Please, note that we have a [Code of Conduct](.github/CODE_OF_CONDUCT.md), which we expect to be strictly respected.

### Running locally

Before getting to run **Musicritic** itself, you'll need to install some tools and set up some environment variables, as shown in the next sections, but it's very simple to configure, and you will just need to do it once, so don't let these additional steps scare you out!

#### Prerequisite

1. Make sure you have **Node.js 12 or later** installed. If not, you can check [here](https://nodejs.org/en/) how to install it.
1. In order to run and manage dependencies, you will need to have installed **Yarn**. You can check [here](https://classic.yarnpkg.com/en/docs/install) how to do it.
1. We will also need that you have the **JDK 1.8 or later** installed. This step is needed because we run firebase emulators to make development easier. You can [go here](https://www.oracle.com/java/technologies/javase-jdk16-downloads.html) in order to install it.
1. And last but not least, you will need to have installed the **Firebase CLI**. Check [here](https://firebase.google.com/docs/cli?hl=pt-br#install_the_firebase_cli) how to install it.

#### Configure Spotify

Create a new file named `.env` on the root directory of the project **with the same content as the [`.env.example` file](.env.example)** also located on the root of the project. You're going to fill this file with information to link Spotify with **Musicritic**. Check below how to do it.

##### Spotify and environment variables

Access [Spotify Developer](https://developer.spotify.com/dashboard/) with your _Spotify Account_ and follow these steps:

1. Create a new `Client ID` in _Dashboard_
2. Fill the information that Spotify asks
3. After created, put the `Client ID` and `Client Secret ID` in the `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` fields on the `.env` file.
4. Go to **Edit Settings** at your Spotify Client ID
5. Set the **Redirect URLs** to `http://localhost:3000/api/auth/callback/spotify`

> You don't need to change any other environment variables on `.env` file. Just keep them with the values

✨ All set! ✨ You're ready to run **Musicritic**!

#### Starting Musicritic

With all configured, now you'll need to run the following commands to install the dependencies and run the **Musicritic**

```sh
yarn install
yarn dev
```

🎉 Musicritic is running 🎉 You now can check it out accessing [http://localhost:3000](http://localhost:3000) on your browser!

> 💡 If you want to check our backend, we have a GraphQL Playground running on [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). You may also need to login on Musicritic to try some queries and mutations, to do that, you can access [http://localhost:3000/api/auth/signin](http://localhost:3000/api/auth/signin) and click on the `Sign in` button.

> 💡 You can check an interactive UI for the local firebase database running on [http://localhost:5000/firestore](http://localhost:5000/firestore)

This is it! Now, if you make any modifications on the code, the application should update itself automatically.

If you got stuck in the middle of the process, feel free to create a question on the [discussions tab](https://github.com/calluswhatyouwant/musicritic/discussions/new) so that we can help you out!

### Suggest a new feature or report a bug

Feel free to [create an issue](https://github.com/calluswhatyouwant/musicritic/issues/new/choose)!

### Do it yourself

We're working on a better [CONTRIBUTING file](CONTRIBUTING.md). Meanwhile, we've got some open issues!

### Maintainers

[@JoseRenan](http://github.com/JoseRenan) and [@JRobsonJr](http://github.com/JRobsonJr)
