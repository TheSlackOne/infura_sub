const Web3 = require('web3');

const network = "rinkeby";
const project_id = "51bcdbf8373f4cd58101860564fa0762";
const url = `wss://${network}.infura.io/ws/v3/${project_id}`;
let web3 = new Web3(new Web3.providers.WebsocketProvider(url));

function watchEtherTransfers() {
  // Instantiate web3 with WebSocket provider
  const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'))

  // Instantiate subscription object
  const subscription = web3.eth.subscribe('pendingTransactions')

  // Subscribe to pending transactions
  subscription.subscribe((error, result) => {
    if (error) console.log(error)
  })
  .on('data', async (txHash) => {
    try {
      // Instantiate web3 with HttpProvider
      const web3Http = new Web3('https://rinkeby.infura.io/')

      // Get transaction details
      const trx = await web3Http.eth.getTransaction(txHash)

      

      const valid = validateTransaction(trx)
      // If transaction is not valid, simply return
      if (!valid) return

      console.log('Found incoming Ether transaction from ' + process.env.WALLET_FROM + ' to ' + process.env.WALLET_TO);
      console.log('Transaction value is: ' + process.env.AMOUNT)
      console.log('Transaction hash is: ' + txHash + '\n')

      // Initiate transaction confirmation
      confirmEtherTransaction(txHash)

      // Unsubscribe from pending transactions.
      subscription.unsubscribe()
    }
    catch (error) {
      console.log(error)
    }
  })
}

watchEtherTransfers();