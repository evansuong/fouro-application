#!/bin/bash
echo "Starting bash script"
git checkout master
git pull origin master
cd frontend
pwd
npm i
cd ../backend
pwd
npm i
cd ..
echo "Finished executing"
