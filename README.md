# Ocean Protocol Data Bounty Platform

[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

## TOC

- [Problem](#problem)
- [Solution Overview](#solution-overview)
  - [Docker to link back and front](#docker-to-link-back-and-front)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [YouTube video](#youtube-video)
  - [Non-technical](#non-technical)
  - [Technical](#technical)

## Problem

## Solution Overview

**!!!The solution currently only works for three accounts that are hardcoded in the code. These are the first three accounts derived from Ocean's seed phrase for Spree!!!**

```
taxi music thumb unique chat sand crew more leg another off lamp
```

the three accounts' private keys are

```
0xC594C6E5DEF4BAB63AC29EED19A134C130388F74F019BC74B8F4389DF2837A58
0xEF4B441145C1D0F3B4BC6D61D29F5C6E502359481152F869247C7A4244D45209
0x5D75837394B078CE97BC289FA8D75E21000573520BFA7784A9D28CCAAE602BF8
```

Also, note, that you need to be running localhost:8545 network in MetaMask. To use the above accounts, simply log out of your current wallet in MetaMask and restore a new one with the above seedphrase. It does not matter what password you choose.

You need to start barge with the following options

```bash
./start_ocean.sh --no-commons --no-agent --local-spree-node
```

This solution will likely not work on Mac due to its host networking limitations, not even mentioning Windows :)

### Docker to link back and front

I define a Dockerfile for both the backend and frontend. These can be started separately. There is a command in Makefile that will get it up for you

```bash
make back-dev
```

this will forward your host's `5050` port to the backend inside of docker running on port `8080` (guinicorn server)

### Backend

### Frontend

## YouTube video

### Non-technical

### Technical
