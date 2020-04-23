# Trustory

Trustory is a proof-of-concept for using blockchain to store, verify, and maintain accurate records of personal achievements, experience, and education - similar to to a resume, but cryptographically verifiable and totally automated. The main idea behind trustory is to improve the trust between students and employers when it comes to what they actually know

This demo dapp is written to run on the ethereum blockchain. In a real-world implementation, however, we'd most likely build it as an application-specific blockchain, as that would give us more opportunity to create economic value from the service through it's native token.

## Architecture

This proof of concept consists of two parts:

1. An oracle for any certification-providing institution (abbreviated PI) to be able to take their internal records and add them to our blockhain. It uses the following technologies:
   1. [Node.js](https://nodejs.org/en/) for the server framework
   2. [Apollo](https://www.apollographql.com/) GraphQL to make data operations simple, flexible, and easy to integrate with any PI's system.
2. An ethereum Dapp to serve as the marketplace of talent between studnents and employers. It uses the following technologies
   1. [truffle](https://www.trufflesuite.com/), a framework for writing Dapps on the ethereum blockchain using the [solidity](https://solidity.readthedocs.io/en/v0.6.6/) programming language.
   2. [web3js](https://github.com/ethereum/web3.js/) for interacting with the smart contracts from the UI
   3. [reactjs](https://reactjs.org/) for the frontend UI 

All of the code for the oracle is in `oracle/`, including the oracle contract interface. All of the code for the truffle dapp, including the main contracts and the react UI is in `dapp`