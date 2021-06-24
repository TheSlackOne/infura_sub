#!/bin/bash
#
# URL format: https://<Network>.infura.io/v3/<Project ID>
# Project ID: 51bcdbf8373f4cd58101860564fa0762 (lattice-dynamic-credit)
# Network: mainnet

get_current_block_number() {
    curl -H 'Content-Type: application/json' \
        -X POST \
        -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1}' \
        https://mainnet.infura.io/v3/51bcdbf8373f4cd58101860564fa0762
}

get_balance() {
    curl -H 'Content-Type: application/json' \
        -X POST \
        -d '{"id":1, "jsonrpc": "2.0", "method": "eth_getBalance","params":["0xfe05a3e72235c9f92fd9f2282f41a8154d6d342b", "latest"]}' \
        https://mainnet.infura.io/v3/51bcdbf8373f4cd58101860564fa0762
}

get_current_block_number
