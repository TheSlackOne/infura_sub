#!/bin/bash
#
# Requires wscat: # npm install -g wscat
#
# URL format: wss://<Network>.infura.io/ws/v3/<Project ID>
# Project ID: 51bcdbf8373f4cd58101860564fa0762 (lattice-dynamic-credit)
# Network: mainnet

NET="mainnet"
PROJECT_ID="51bcdbf8373f4cd58101860564fa0762"
URL="wss://${NET}.infura.io/ws/v3/${PROJECT_ID}"
COMMON_PAYLOAD="{\"jsonrpc\":\"2.0\", \"id\": 1, \"method\": \"eth_subscribe\", \"params\": "

new_heads() {
    NEW_HEAD_PAYLOAD="[\"newHeads\"]}"
    PAYLOAD="${COMMON_PAYLOAD}${NEW_HEAD_PAYLOAD}"

    # ToDo: Review -w, maybe we can keep alive in a cleaner way.
    wscat -c "${URL}" \
        -w 60 \
        -x "${PAYLOAD}"
}

logs() {
    ADDRESS_LIST="[\"0x8320fe7702b96808f7bbc0d4a888ed1468216cfd\"]"
    LOGS_PAYLOAD="[\"logs\", {\"address\": ${ADDRESS_LIST}}]}"
    PAYLOAD="${COMMON_PAYLOAD}${LOGS_PAYLOAD}"
    
    # ToDo: Review -w, maybe we can keep alive in a cleaner way.
    wscat -c "${URL}" \
        -w 60 \
        -x "${PAYLOAD}"
}

logs