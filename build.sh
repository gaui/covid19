#!/bin/bash -x

NODE_VERSION=13
DOCKER_REGISTRY=gaui
PACKAGE_TYPE=$1
PACKAGE_PREFIX="@gaui/covid19-"
PACKAGE_NAME=$2
PACKAGE_DIST=dist/$([ -z "$3" ] || echo "$3")

export DOCKER_BUILDKIT=1

docker build \. \
  -f Dockerfile\.$PACKAGE_TYPE \
  -t $DOCKER_REGISTRY/$PACKAGE_NAME \
  --build-arg NODE_VERSION=$NODE_VERSION \
  --build-arg PACKAGE_PREFIX=$PACKAGE_PREFIX \
  --build-arg PACKAGE_NAME=$PACKAGE_NAME \
  --build-arg PACKAGE_DIST=$PACKAGE_DIST
