#!/bin/bash
git pull
echo 'Executed: git pull'
echo 'Pulling remote code'
echo "Code pulling completed"

git status
echo 'Executed: git status'

git add .
echo 'Executed: git add .'
echo "Please enter the submission description text if there is no default submission code"

read describe
if [ ! -n "$describe" ]
then
    describe="submit code"
fi
git commit -m "$describe"
echo "Executed: git commit -m '${describe}'"

git push

echo "Code submission completed"

