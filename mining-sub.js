const Web3 = require("web3");

// URL format: wss://<Network>.infura.io/ws/v3/<Project ID>
// Project ID: 51bcdbf8373f4cd58101860564fa0762 (lattice-dynamic-credit)
// Network: mainnet
const network = "mainnet";
const project_id = "51bcdbf8373f4cd58101860564fa0762";
const url = "wss://" + network + ".infura.io/ws/v3/" + project_id;
const url2 = `wss://${network}.infura.io/ws/v3/${project_id}`;
let web3 = new Web3(new Web3.providers.WebsocketProvider(url2));

const instance = new web3.eth.Contract(<abi>, <address>);
    
instance.getPastEvents(
    "SomeEvent",
    { fromBlock: "latest", toBlock: "latest" },
    (errors, events) => {
        if (!errors) {
            // process events
        }
    }
);
