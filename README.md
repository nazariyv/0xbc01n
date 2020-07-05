# Ocean Protocol Data Bounty Platform

[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

## TOC

- [Quickstart](#quickstart)
  - [Quicker version](#quicker-version)
  - [Detailed version](#detailed-version)
- [Problem Outline](#problem-outline)
- [Solution Overview](#solution-overview)
  - [Docker to link back and front](#docker-to-link-back-and-front)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [YouTube video](#youtube-video)
  - [Non-technical](#non-technical)
  - [Technical](#technical)
- [Dispute resolution](#dispute-resolution)

## Quickstart

### Quicker version

```bash
git clone https://github.com/oceanprotocol/barge.git

cd barge

./start_ocean.sh --no-commons --no-agent --local-spree-node

cd ..

git clone https://github.com/nazariyv/0xbc01n

cd 0xbc01n

make start-dev

open localhost
```

### Detailed version

You will need to git clone the [`barge`](https://github.com/oceanprotocol/barge) repo first. Now go into its root and run

```bash
./start_ocean.sh --no-commons --no-agent --local-spree-node
```

This will deploy the local network (Spree) keeper smart contracts for you (the blockchain part of the Ocean Protocol), as well as move their artifacts to

```
~/.ocean/keeper-contracts/artifacts
```

so that we can use these ABIs (interface signatures, basically the metadata about the contents of the smart contract) to communicate with them on the Python backend). Note that I have found the escrow contract missing. Meaning it was not compiled and deployed, and no log traces either. Perhaps, this was part of the reason for why this solution is not complete.

I have then defined two `Dockerfile`s, for backend and frontend and "glued" them up in the `docker-compose.yaml` utilising network hosting for easy communication with host's numerous barge containers. For this reason, this soulution will not work on Macs. Haven't tested Windows, but I bet my grandma it won't work there either.

```bash
git clone https://github.com/nazariyv/0xbc01n
```

cd `0xbc01n` and then run

```bash
make start-dev
```

now you can simply navigate to `localhost` in your browser's URL and interact with the application

## Problem Outline

Full description is [here](https://gitcoin.co/issue/oceanprotocol/ocean-bounties/24/4379).

Brief description:

Ocean Protocol defines a set of rules that govern secure share, use and monetization of datasets. This is achieved by using Squid libray (python and js maintained implementations) which communicates with lower level components.

Ocean Protocol wants us to build a Data Bounty platform for them.

> What is a data bounty platform, you ask?

It is a **website**, in this case, that facilitates **data seekers** (machine learning enthusiasts, companies, students, etc.) in better discovering and obtaining the data from **data providers**. A concrete example follows, taken from my own experience.

You are a machine learning enthusiast that has just learned about this cool new neural network that trades Chinese stocks very well. You learn about its workings and decide to give it a shot. You quickly come to realize that you need a **ton** of data to train the model, since the number of degrees of freedom in it is astronomical. You try to scrape a few sites, you quickly learn that they start banning your ip. Meh, I will just use VPN and try it again. They start to ban your VPN ips. Hmm, lets call a couple of data providers and get the data. You say you are a poor student and you need a discount, they quote you `$10k`.  Oh well, I will get a freelancer do it for me. Initially, somewhat successful but it starts getting expensive. Alright, see how the freelancer did it and do it yourself. !!`2`!! years later, you have a good amount of data, but machine learning is now at a stage where you do perfect interpolation between different human faces based on a number of different features. Well, that was a bummer. You have spent 2 yars of your life, collecting the data for the model that you wanted to implement on the weekend. Imagine this now, you visit our data bounty platform, post the "bounty" saying: "Yo, fellow bounty hunters, you will probably hack this out in a day, or maybe you already have it. I need plenty of news articles for this model that I will be training to trade stocks and get $$$. I offer you `10000` OCEAN tokens for it. Please autosample your dataset, so that I can be confident in the data you got". And now every bounty hunter on the platform sees it and starts competing for your request. This is a great mechanic and is sure to:

(i) get you the top quality data you need, provided the price is set right

(ii) save you a ton of time, and maybe you do actually get to make a dollar or two on your sleek state-of-the art bi-directional GRU with attention layer neural network (this would have happened in the parallel universe, surely)

Now that we have a good overview of the problem at hand and how we can solve it using Ocean Protocol, let's review the solution implementation

## Solution Overview

![banner](.assets/home-page.png)


**!!!The solution currently only "works" for three accounts that are hardcoded in the code. These are the first three accounts derived from Ocean's seed phrase for Spree!!!**

Works is in double quotes there because the consumption of the url, the final step in the data bounty workflow, where the consumer (bounty creator) gets access to the data, does not pass the brizo (access control proxy server for Ocean Protocol) authorization checks. Since I am running out of time, I postpone finding the issue in this. For now, the consumer simply can't get access to the data. I do not foresee this, however, to take much time to resolve, especially with someone from Ocean Protocol's dev team helping out from time to time.

```
taxi music thumb unique chat sand crew more leg another off lamp
```

the three accounts' private keys are

```
0xC594C6E5DEF4BAB63AC29EED19A134C130388F74F019BC74B8F4389DF2837A58
0xEF4B441145C1D0F3B4BC6D61D29F5C6E502359481152F869247C7A4244D45209
0x5D75837394B078CE97BC289FA8D75E21000573520BFA7784A9D28CCAAE602BF8
```

---

This application separates the front and the back. You can find these here `front/` and `back/` in the root of this repo. The front is written in `React` with bare-metal `HTML` elements.

The backend uses Python's [Falcon](https://falcon.readthedocs.io/en/stable/index.html) [WSGI](https://wsgi.readthedocs.io/en/latest/what.html) library running on [Gunicorn](https://gunicorn.org/) [WSGI](https://wsgi.readthedocs.io/en/latest/what.html) server. Everything is tied together with docker-compose `yaml` file with network hosting to be able to talk to [barge](https://github.com/oceanprotocol/barge) (that needs to be separately git cloned and spun up)

The end-to-end workflow is as follows

1. Bounty creator / data seeker comes to the platform and creates a "bounty" specifying what exactly he needs

2. Every bounty hunter (data provider) on the website sees this and can register their desire to work on it (start work button)

3. After some time, if they need to collect, or immediately they fulfill the bounty. This means that they provide the full dataset url as well as sample dataset url to the bounty

4. It is up to bounty creator to pick the winner (in the future, multiple types of bounties will be implemented)

**What is missing and not-working**

1. Pay the price for data. All is free, irrespective of the price indicated on the bounty

2. The final consumption URL link is generated, but the consumer always fails brizo authorization

3. The final step where the bounty creator "picks winner" is not complete. The workflow needs to be different. It can as described by Manan [here](https://medium.com/@manan.patel/f4b630063b90), be of the form: bounty creator likes the sample, and then requests the full access. Upon authorizing that the money has been spent into the escrow contract that acts as an intermediary in the transaction (data access authorization), access is granted to the data, that is **streamed** by Ocean Protocol directly to the data consumer, in order to keep the data source private

I hastily coded the backend up and so the code quality is not as sleek as in my filter pod hack. Provided the extra time, it can easily be polished

---
**Word of Caution**

This solution will likely not work on Mac due to its host networking limitations in Docker, not even mentioning Windows :)

### Docker to link back and front

I define a Dockerfile for both the backend and tje frontend. These can be started separately. There is a command in Makefile that will get the backend up for you

```bash
make back-dev
```

### Backend

[API docs](https://documenter.getpostman.com/view/3718078/T17FCUqu?version=latest)

### Frontend

[Overview docs](front)

## YouTube video

Will upload as soon as my laptop gets back to me. My screen went kaput after 2 months of use

### Non-technical

Coming as soon as my laptop gets back from repair

### Technical

Coming as soon as my laptop gets back from repair

## Dispute Resolution

For dispute resolution we propose to use a ready solution instead of coming up with own mechanics. [Kleros.io](https://kleros.io/static/onepager_en-3165e4676c4ed1529064608a83967c23.pdf) is one such solution.

Kleros is a decentralized court. They have jurors that get assigned to cases and they are financially incentivized to make the right decision. There are a number of limitations that I came up with that may pertain to this solution, these may not be completely accurate, since I have had very limited time to explore. Some of the limitations that I could think of without exploring Kleros too deeply

1. Who decides who gets approved to be the juror?
2. Anyone can become a juror. Can this be games? By, for example, staking just enough `PNK` across the multiple jurors that you control such that the expected value of the payoff is always positive?
3. It looks like there are only `50` jurors right now, is this enough?
4. What is the mechanism that decides how many jurors work on any particular case? It would obviously be more beneficial if more jurors work on our cases.

Reaching out to Kleros, their developer would be happy to guide us in the integration of it with this bounty platform, if we proceed to the next stage.

`http://resolve.kleros.io/` will be used as the front-end for the 'arbitable' side, i.e. all the created dispute cases on our data bounty platform would go here. This would save us the time of implementing the front-end. It appears that the 'arbitrator' side would not need to be implemented at all, since we would leverage Kleros' jurors.

To enable the integration, [arbitable interface](https://developer.kleros.io/en/latest/implementing-an-arbitrable.html) would have to be implemented in the escrow contract that is responsible for giving the bounty creator the permission to use the data upon fulfillment of the conditions (paying the price indicated by the bounty hunter). When I worked on the bounty, this contract did not get created in barge, and it probably also, part of the reason for why the last step that is responsible for granting the permission to the bounty creator is not going through the authorization part of the code in brizo