# Rick and Morty Wonderland

## Tech Stack
Vue 3.0 + Parcel V2

## Netlify Link
Netlify link is available [here](#toreplace).

### Why not Heroku
I think heroku is not really for a static site, there is no server required in this test. Hence deployed to Netlify.

## Setting Up

```
npm i
```

## Running Locally
```
npm run dev
```

### Why not parcel
Initially I have setup Vue3 with Parcel, and it works locally with no issue. You can check this original repo configured using Parcel + Vue3 here. The setup and local dev instructions are in `README.md` file

The reason I switched to Vue Cli half way throught the test is that I had issue deploying to both Heroku and Netlify.

I have done various trials and research, including build then host locally using node server. In the end I think the root issue is caused by Parcel Build.

I have found [this issue](https://github.com/parcel-bundler/parcel/issues/1656) on Parcel github repo which is the exact issue I has when build and deploy.

I then tried the work around mentioned in that issue. Then it threw a new error which I found out to be an [exisiting bug with Parcel V2](https://github.com/parcel-bundler/parcel/issues/5814). The last comment mentioning the issue exists was posted 17 days ago.

I also downgraded to the _working version_ mentioned in the first issue comments, but keep getting issues/bugs related to that specific parcel version.

In the end I felt I have spent good amount of time on this and probably it doesn't worth me spending more time just trying to debug it and host it. I still had half of the test to be finished and I think that is more important.

It certainly might be me just didn't config the whole thing properly as well. Keen to get some adivce from you.

## Other Notes and Design Decisions
TODO