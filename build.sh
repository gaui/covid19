#!/bin/bash -x

NODE_VERSION=13
DOCKER_REGISTRY=gaui
PACKAGE_TYPE=$1
PACKAGE_SCOPE="@gaui/"
PACKAGE_PREFIX="covid19-"
PACKAGE_NAME=$2
PACKAGE_DIST=dist/$([ -z "$3" ] || echo "$3")
PACKAGE_VERSION=`node -e 'console.log(require("./lerna.json").version);'`

export DOCKER_BUILDKIT=1



docker build \. \
  -f Dockerfile\.$PACKAGE_TYPE \
  -t $DOCKER_REGISTRY/$PACKAGE_PREFIX$PACKAGE_NAME:$PACKAGE_VERSION \
  --build-arg NODE_VERSION=$NODE_VERSION \
  --build-arg PACKAGE_SCOPE=$PACKAGE_SCOPE \
  --build-arg PACKAGE_PREFIX=$PACKAGE_PREFIX \
  --build-arg PACKAGE_NAME=$PACKAGE_NAME \
  --build-arg PACKAGE_DIST=$PACKAGE_DIST
