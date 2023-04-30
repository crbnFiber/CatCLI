# CatAPI CLI

The CatAPI CLI is a command-line interface for downloading cat images from [The Cat API](https://thecatapi.com/).

## Installation

Clone the repo or download and unzip the [source code](https://github.com/crbnFiber/CatCLI/releases/download/v1.0.0/CatCLI.zip) and navigate to the project directory. 

Use the [node package manager](https://nodejs.org/en/download) to install the cli.


```bash
# install the cli
npm install -g .

# install the required packages
npm install
```

## Usage

Limit must be a number between 1 and 100.

Breed must be a valid id from [here](./resources/breeds.json).

```bash
# Shows all of the arguments and what they do.
catbot --help

# Downloads 20 images of random cat breeds.
catbot -l 20
catbot --limit=20

# Downloads 1 image of a bengal cat.
catbot -b beng
catbot --breed=beng

# Downloads 20 images of bengal cats.
catbot -l 20 -b beng
catbot --limit=20 --breed=beng

# Changes the download directory.
catbot --cd=path
```

## License

[MIT](https://choosealicense.com/licenses/mit/)