# Changelog

## 1.1.1

### App

- Fixed responsiveness of cards on iPad Pro
- Fixed footer, made it fixed on bottom.
- Fixed isolation SVG, added `viewBox` property

### Other

- Began adopting [Conventional Commits](https://www.conventionalcommits.org),
  Angular convention. [See Collaboration in README](./README.md#Collaboration).
  This makes changelog generation later on much easier.
- Updated `build.sh` to read version of tagged Docker image from `lerna.json`.

## 1.1.0

### Core

- Added Icelandic data provider.

### API

- Added GraphQL API based on NestJS.

### App

- Use Apollo Client and fetch data from GraphQL API.
- Added title above each card.
- Changed SVG images.

### Other

- Added Docker build script.

## 1.0.0

- Initial state of the project.
