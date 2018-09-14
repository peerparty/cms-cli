# Get Started

There are two pieces to the browser based CMS: a CLI (command line interface) to deploy your markdown files, and the client website.

## Dependencies

### Dat

Dat is a dependency.  You can install it [here](https://datproject.org/).

### Node.js

Node.js is a dependency, for the CLI anyway.  You can install it [here](https://nodejs.org/en/).

## The CLI

You can find the CLI here: [dat://cd1dca912ff7af201302523676fb50274bee06db168cb6eceae194d411a45d73](dat://cd1dca912ff7af201302523676fb50274bee06db168cb6eceae194d411a45d73).  You can download it:

    $ dat clone dat://cd1dca912ff7af201302523676fb50274bee06db168cb6eceae194d411a45d73

### Setup

Since you have cloned the dat, you will need to get the key of your new hyperdb.  You can find it by running:

    $ cms key

### Tell the client which database 

You will need to tell the client which hyperdb to use.  You can set this by opening the index.js of the client in your favorite editor and updating the line that begins with:

    const key = 

Example:

    const key = '3f111b77243a82b96aa91a38e4b2c4d4bd3b208d5e154ecc8505f9dffc3bd8dd'

### Create a webpage

To create a new webpage simply author a markdown file, and add it to the CMS.

    $ cms page yourfile.md

For additional options try:

    $ cms page

### Browsers are peers 

If someone is viewing your page, other clients will pull your site and CMS database from their browser.  If there are no other peers viewing your site, you can run an non-browser peer to standby by simply running:

    $ cms run

If you are using homebase, you can also pin your hyperdb data so data is online when no one else is...

### List webpages

To list webpages run:

    $ cms get pages

### To view a webpage run:

    $ cms get a255844d3cafd0e997ad6e18b2b7b0e731e12020

### Remove a webpage

To remove a webpage from your site run:

    $ cms rm a255844d3cafd0e997ad6e18b2b7b0e731e12020


