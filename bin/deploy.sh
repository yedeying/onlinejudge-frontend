#!/bin/sh
cd `dirname $0`/../
if [ -f "./output.tgz" ]
then
  tar zxvf output.tgz && rm output.tgz
fi
