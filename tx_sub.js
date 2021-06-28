const Web3 = require('web3');

function watchEtherTransfers() {
  // Instantiate web3 with WebSocket provider
  const network = "rinkeby";
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
      console.log('Transaction hash is: ' + txHash + '\n')
      
      // Instantiate web3 with HttpProvider
      const web3Http = new Web3('https://rinkeby.infura.io/v3/51bcdbf8373f4cd58101860564fa0762')

      // Get transaction details
      const trx = await web3Http.eth.getTransaction(txHash)
      //console.log(`Transaction details: ${JSON.stringify(trx)}`)

      //const valid = validateTransaction(trx)
      // If transaction is not valid, simply return
      //if (!valid) return

      const obj = JSON.parse(JSON.stringify(trx))
      console.log(`From: ${obj?.from}`);
      console.log(`To: ${obj?.to}`);
      
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