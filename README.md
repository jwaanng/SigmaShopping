## Installation Process

To clone this application, you'll need:

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com))
- [Python](https://www.python.org/downloads/)

Then, from your command line:

```bash
# Clone this repository
$ git clone https://github.com/jwaanng/SigmaShopping

# Go into the backend folder
$ cd SigmaShopping/server

# install virtual environment
$ python3 -m venv .venv # for linux
> py -3 -m venv .venv   # for windows

# make sure you activate virtual environment
$ source .venv/bin/activate # for linux
> .venv\Scripts\activate # for windows

# install necessary dependencies
$ pip install -r requirements.txt

# go to the frontend folder
$ cd ../client

# install necessary packages
$ npm install # using npm
$ bun install # using bun
$ pnpm install # using pnpm
$ yarn install # using yarn

# run the development server and go to localhost:3000
$ npm run dev
$ bun run dev
$ pnpm run dev
$ yarn run dev
```
