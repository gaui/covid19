# COVID-19

This is a project that is aimed towards retrieving statistics about COVID-19.
To begin with it's only for Iceland, but it will probably be expanded to other
countries.

This project was just meant as a hobby project for fun while I'm unemployed.

## Components

This is a monorepo with three components for abstraction.

- Core
- Web API (GraphQL)
- App

### Core

Core is the core of the system. It's a Node module with the data providers for the API.

The purpose behind the core is to abstract core fundamentals for the project,
so it can be used somewhere else.

### Web API

This is a GraphQL API that's built with [NestJS](https://nestjs.com) and uses the [Core](#Core) for providing the data used.

### App

The application is seperated into two:

- React web application
- Chrome extension

#### Web

The web application is built with React and uses Redux Toolkit for state management.

It's published [here](https://covid.gaui.is).

#### Chrome

The Chrome extension is built upon the web application, and is bundled into a Chrome extension.

It's published in the [Chrome Web Store](https://chrome.google.com/webstore/detail/kbifdhlakolnkoogejddnjojcjjiejig).

## Collaboration

If you would like to collaborate on this project, it's more than welcome!

_Make sure you prepend commits with the following: `[core]`, `[api]`, `[app]`
or nothing if it's a general change._

1. Fork the project.
2. Make your changes.
3. Make sure all tests pass: `yarn test`
4. Make sure it passes linting: `yarn lint`
5. Make sure it's formatted properly: `yarn format`
6. Submit a PR and explain your changes.

## Credits

Thanks go out to [covid.is](https://www.covid.is) and [NovelCOVID](https://github.com/NovelCOVID/API).

All collaborators will be listed here.
