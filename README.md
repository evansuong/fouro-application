# CSE 110 Project: fouro-application

Fouro is ... (insert short paragraph here)

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

## Setup

1.  Install [node.js](https://nodejs.org/en/)

2.  Install [Expo](https://docs.expo.io/) CLI:

        npm install -g expo-cli

3.  Setup Backend Firebase Configuration (see [./backend](./backend) README)

4.  Install dependencies in BOTH backend and frontend:

    1. In [./backend](./backend) AND [./frontend](./frontend) and run:

       ```
       npm install
       ```

5.  Run application with Expo from [./frontend](./frontend) directory

        npm start

6.  Run from Android Virtual Device (AVD) or install Expo Client on your mobile device

7.  Scan QR code with your camera

## Pulling changes

**Before you start working, make sure to type:**

    npm run sync

    OR (if the top command doesn't work)

    npm run sync2

    OR (if neither works)

    ./sync.sh

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

1.  Create a new branch (this copies all the files from your current branch to the new branch)

        git branch feature-name/first-last

2.  Navigate to your branch

        git checkout feature-name/first-last

3.  Do some coding and commit the changes

        git add .
        git commit -m "changes you made"

4.  Push to the branch you created

        git push origin featurename/yourname

5.  Create a pull request on Github by going to your branch and clicking on "pull request"

6.  Make the pull request and one of us will look over the code and merge it to the `master` branch to save the changes
