# syntax = docker/dockerfile:experimental

ARG PACKAGE_SCOPE
ARG PACKAGE_PREFIX
ARG PACKAGE_NAME
ARG PACKAGE_DIST
ARG TMP_DIR=/tmp
ARG APP_DIR=/app
ARG NODE_VERSION

### Build

FROM node:${NODE_VERSION}-slim AS build
ARG PACKAGE_SCOPE
ARG PACKAGE_PREFIX
ARG PACKAGE_NAME
ARG PACKAGE_DIST
ARG TMP_DIR
ARG APP_DIR

WORKDIR ${TMP_DIR}
COPY . .

RUN --mount=type=cache,id=nmcache1,target=/tmp/nmcache1 yarn --frozen-lockfile
RUN --mount=type=cache,id=nmcache1,target=/tmp/nmcache1 cp -R /tmp/nmcache1 /tmp/node_modules
RUN yarn test:ci
RUN yarn lerna run build --scope ${PACKAGE_SCOPE}${PACKAGE_PREFIX}${PACKAGE_NAME} \
  --include-dependencies --private

RUN mkdir -p ${APP_DIR}
RUN cp -R --parents -t ${APP_DIR} node_modules package.json yarn.lock \
  packages/*/package.json packages/*/${PACKAGE_DIST}

### Runtime

FROM node:${NODE_VERSION} AS runtime
ARG PACKAGE_NAME
ARG PACKAGE_DIST
ARG APP_DIR

COPY --from=build ${APP_DIR} ${APP_DIR}
WORKDIR ${APP_DIR}/packages/${PACKAGE_NAME}/${PACKAGE_DIST}

RUN yarn global add http-server

EXPOSE 80

ENTRYPOINT ["http-server", "-p 80", "-s"]
