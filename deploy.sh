git commit -a -m "$0"
git push

if [ $1 == "-c" ]; then
    ssh pi@192.168.1.1 git -C /home/pi/Projects/nit-home/nit-home-web pull
fi

#kill old process
ssh root@192.168.1.1 killall -9 node
ssh root@192.168.1.1 killall -9 python3

#upload build
scp -rp build/ pi@192.168.1.1:/home/pi/Projects/nit-home/nit-home-web

#run devices wrokers
ssh root@192.168.1.1 python3 /home/pi/Projects/nit-home/server/led-ws-worker.py &

#run web server
ssh root@192.168.1.1 cd /home/pi/Projects/nit-home/nit-home-web | npm run prod-start