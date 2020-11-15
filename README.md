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

1. Install [node.js](https://nodejs.org/en/)
2. Install [Expo](https://docs.expo.io/) CLI:

        npm install -g expo-cli

3. Install dependencies
Go to frontend directory and type

        npm install

Go to backend directory and type

        npm install

4. Run application with Expo from "/frontend" directory

        npm start

5. Run from Android Virtual Device (AVD) or install Expo Client on your mobile device
6. Scan QR code with your camera

## pulling changes

before you start working, make sure to pull from the master repo to get any changes done using:

        git pull origin master

if you don't have the origin variable set, run:

        git remote add origin https://github.com/evansuong/fouro-application

and verify your local repo is connected to the github repo

        git remote -v

should return something like this:

        origin  https://github.com/evansuong/fouro-application (fetch)
        origin  https://github.com/evansuong/fouro-application (push)

## pushing changes

when working, make sure to work on your own feature branch

1. create new branch (this copies all the files from your current branch to the new branch)

        git branch featurename/yourname

2. navigate to your branch

        git checkout branchYouWannaCheckout

3. do sum coding and commmit the changes

        git add .
        git commit -m "changes you made"

4. push to the branch you created

        git push origin featurename/yourname

5. create a pull request on github by going to your branch and click on "pull request"
6. make the pull request and one of us will look over the code and merge it to the master branch to save the changes
