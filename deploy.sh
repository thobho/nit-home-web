
if [ $1 == "-c" ]; then
    ssh pi@192.168.1.1 git -C /home/pi/Projects/nit-home/nit-home-web pull
else    
    echo "Strings are not equal"
fi

#upload build
scp -rp build/ pi@192.168.1.1:/home/pi/Projects/nit-home/nit-home-web
#run server
ssh root@192.168.1.1 chmod +x /home/pi/Projects/nit-home/nit-home-web/run-server.sh
ssh root@192.168.1.1 /home/pi/Projects/nit-home/nit-home-web/run-server.sh