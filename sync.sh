#!/bin/bash
echo "Starting bash script"
git stash
git pull origin master
git stash pop
cd frontend
pwd
npm i
cd ../backend
pwd
npm i
cd ..
echo "Finished executing"
