echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server"
scp -i "/Users/pranavbhargava/.ssh/Workout-Buddy.pem" -r build/* bhargavap@172.210.13.26:/var/www/workout-buddy.bhargavap.club/ 

echo "Done!"