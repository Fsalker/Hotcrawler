# Hotcrawler

Ever wondered why pornhub's age filter never worked? Well, I've made it work. Sort of. Here's a (very) messy script that crawls the pornstars and keeps their `rank`, `name`, `age`, `gender` and `url` so that you may browse all the freshies out there at will.

# Running
1. `npm i`
2. `npm run start (amount-of-pornstars) (gender) (skip-pornstars-without-age)`
3. Explore `./crawledData` and browse your spicy data at will with your favorite JSON viewer

Default values for the CLI parameters

| Amount of pornstars | Gender | Skip pornstars without age |
|:-:|:-:|:-:|
| 1000 | female | true |

Types for the CLI parameters

| Amount of pornstars | Gender | Skip pornstars without age |
|:-:|:-:|:-:|
| Number | String in ["male", "female", "m2f", "f2m"] | Boolean |

# Contributing

Feel free to open issues in this repo, like the almighty [boobo94](https://github.com/boobo94) has already done [here](https://github.com/Fsalker/Hotcrawler/issues/1) and [here](https://github.com/Fsalker/Hotcrawler/issues/2).

# License

[GNU GPL v3](https://choosealicense.com/licenses/gpl-3.0/). Open source is life.

If you find this license troublesome for your affairs, you may contact me and we'll work something out.
