rm -rf build
npm run build
cd build
zip -r build.zip *
scp -i ~/.moot.pem build.zip ubuntu@3.120.152.26:/home/ubuntu
ssh -i ~/.moot.pem ubuntu@3.120.152.26 "sudo rm -rf /var/www/html/* && sudo mv /home/ubuntu/build.zip /var/www/html && cd /var/www/html && sudo unzip -o build.zip && sudo rm build.zip"
cd ..
rm -rf build
