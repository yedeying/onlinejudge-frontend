#!/bin/sh
cd `dirname $0`/../
yarn build \
  && tar zcvf output.tgz output \
  && scp output.tgz vultr:~/web/szuoj/frontend \
  && rm output.tgz \
  && ssh vultr "cd ~/web/szuoj/frontend && ./bin/deploy.sh"
