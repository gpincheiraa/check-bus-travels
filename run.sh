docker run -it --privileged --rm --net=host -e "TRAVEL_DATE=01-11-2016" -v /dev/shm:/dev/shm -v $(pwd):/home/dev/app protractor-cucumber