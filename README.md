# Transit Info

A simple web app to display some information from public transit agencies.

## Agencies

### Supported agencies
- [x] [WMATA](https://www.wmata.com/)

### Possible future agencies
- [ ] [CTA](https://www.transitchicago.com/)
- [ ] [MBTA](https://www.mbta.com/)
- [ ] [MARTA](https://www.itsmarta.com/)
- [ ] [BART](https://www.bart.gov/)
- [ ] [AC Transit](https://www.actransit.org/)
- [ ] [SF Muni](https://www.sfmta.com/)
- [ ] [VTA](https://www.vta.org/)
- [ ] [Caltrain](https://www.caltrain.com/)
- [ ] [TriMet](https://trimet.org/)
- [ ] [LIRR](https://www.mta.info/lirr)
- [ ] [Metro-North](https://www.mta.info/mnr)
- [ ] [PATH](https://www.panynj.gov/path.html)
- [ ] [NJ Transit](https://www.njtransit.com/)
- [ ] [SEPTA](https://www.septa.org/)
- [ ] [PATCO](https://www.ridepatco.org/)


## Development

This project was built with [Remix](https://remix.run/) using [React](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/). It is designed to be deployed to [Netlify](https://www.netlify.com/).

This project uses [pnpm](https://pnpm.io/) for package management.


### Pre-requisites
- WMATA API key (see [here](https://developer.wmata.com/))
  - Add the key to a `.env` file in the root directory of the project, like this: `WMATA_API_KEY=your-key-here`
- Node.js (see [here](https://nodejs.org/en/))
- pnpm (see [here](https://pnpm.io/installation))
- A text editor (I recommend [WebStorm](https://www.jetbrains.com/webstorm/) or [VS Code](https://code.visualstudio.com/))

### Getting started

1. Clone the repository
2. Run `pnpm install` to install dependencies
3. Run `pnpm dev` to start the development server
4. Run `pnpm build` to build the project for production
5. Run `pnpm start` to start the production server

### Why Remix?

Remix has a particular philosophy focused upon building _upon_ existing [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) rather than _replacing_ them. This is a philosophy that I agree with and I think it makes for a better developer experience. 

For example, the use of `loaders` in Remix means that it's possible for this app to process data from an API on the server and only send a stripped-down version of that data to the client. This means that the client doesn't have to download as much data and the server doesn't have to do as much work. It preserves the benefits of server-side rendering while also making the app more performant.

### Why Tailwind CSS?

Tailwind CSS is well-suited for this project because it's a small app that doesn't need a lot of custom styling. It has excellent built-in accessibility features, such as [`sr-only`](https://tailwindcss.com/docs/screen-readers) and [`focus-visible`](https://tailwindcss.com/docs/focus-visible), which are important for a project like this. It also has a great [Dark Mode](https://tailwindcss.com/docs/dark-mode) feature that makes it easy to add support for dark mode.