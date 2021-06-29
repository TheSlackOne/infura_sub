const Web3 = require('web3');

function watchEtherTransfers() {
  // Instantiate web3 with WebSocket provider
  const network = "rinkeby";
  //const network = "mainnet";
  const project_id = "51bcdbf8373f4cd58101860564fa0762";
  const url = `wss://${network}.infura.io/ws/v3/${project_id}`;
  let web3 = new Web3(new Web3.providers.WebsocketProvider(url));

  // Instantiate subscription object
  const subscription = web3.eth.subscribe('pendingTransactions')

  // Subscribe to pending transactions
  subscription.subscribe((error, result) => {
    if (error) console.log(error)
  })
  .on('data', async (txHash) => {
    try {
      // Instantiate web3 with HttpProvider
      const web3Http = new Web3(`https://${network}.infura.io/v3/${project_id}`)

      // Get transaction details
      const trx = await web3Http.eth.getTransaction(txHash)
      
      const json_obj = JSON.parse(JSON.stringify(trx))
      if (json_obj?.input && json_obj?.input !== '0x') {
        console.log(`Transaction hash is: ${txHash}`)
        //console.log(`Payload: ${JSON.stringify(trx)}`);
        json_obj.from ?? console.log(`From: ${json_obj.from}`)
        json_obj.to ?? console.log(`To: ${json_obj.to}`);
        console.log(`data: ${json_obj.input}`);
      }

      //const valid = validateTransaction(trx)
      // If transaction is not valid, simply return
      //if (!valid) return

      // Initiate transaction confirmation
      //confirmEtherTransaction(txHash)

      // Unsubscribe from pending transactions.
      //subscription.unsubscribe()
    }
    catch (error) {
      console.log(error)
    }
  })
}

watchEtherTransfers();