# CSE 110 Project: Fouro

Fouro is an iOS/Android application that allows you to send virtual hugs to friends and feel close
and connected to others. Fouro will help remind you to reach out to friends you haven't connected with
in a while as well as serve as a platform to share and store memories together. Send and receive hugs
with friends and stay socially connected to loved ones around you!

## Team Care and Friendship Everyday (CAFE)

Alana Klopstein - Project Manager

Alex Chow - Software Dev Lead

Eman Sherif - Software Architect

Evan Serrano - Business Analyst

Evan Suong - User Interface Specialist

Rickesh Khilnani - Senior System Analyst

Terry Feng - Database Specialist

Tyus Liu - Software Dev Lead

Vicki Chen - Quality Assurance Lead

Vivian Tang - Quality Assurance Lead

Vuk Radovanovic - Algorithm Specialist

## Technologies

NERF Stack

N - NodeJS

E - Express

R - React Native

F - Firebase

## Setup

1.  Install [node.js](https://nodejs.org/en/)

2.  Install [Expo](https://docs.expo.io/) CLI:

        npm install -g expo-cli

3.  Setup backend dependencies and run server

        cd backend
        npm install
        npm run server

4.  Open a new terminal and install dependencies in frontend:

        cd frontend
        npm install
        npm start

5.  Install Expo Client on your iOS/Android device

6.  Scan the Expo QR code with your camera

7.  Copy your computer IP address from the Expo Link (looks something like this, between the second "/" and ":")

        exp://192.168.1.46:19000
              ^          ^

8.  Paste your computer IP in [./frontend/src/API.js](./frontend/src/API.js) on line 3:

        const server = "http://<YOUR-IP-HERE>:3000";

# Development

## Pulling changes

**Before you start working, make sure to type:**

    ./sync.sh

OR

    bash sync.sh

This makes sure that your current branch is up to date with the master branch. You will also have to resolve merge conflicts and choose which parts of the code get to stay.

If you don't have the `origin` variable set, run:

    git remote add origin https://github.com/evansuong/fouro-application

and verify your local repo is connected to the github repo.

    git remote -v

It should return something like this:

    origin  https://github.com/evansuong/fouro-application (fetch)
    origin  https://github.com/evansuong/fouro-application (push)

## Pushing changes

When working, make sure to work on your own feature branch

1.  Create a new branch of the form [feature-name]/[your-name](this copies all the files from your current branch to the new branch)

        git branch team/feature-name

2.  Navigate to your branch

        git checkout team/feature-name

3.  Do some coding and commit the changes

        git add .
        git commit -m "changes you made"

4.  Push to the branch you created

        git push origin team/feature-name

5.  Create a pull request on Github by going to your branch and clicking on "pull request"

6.  Make the pull request and one of us will look over the code and merge it to the `master` branch to save the changes
