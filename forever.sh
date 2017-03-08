#forever cleanlogs
forever start -a -l forever.log -o out.log -e err.log bin/www
#forever list
#forever stop bin/www
