import { Transaction } from "ethereumjs-tx"

async function getBalance(address, contract){
    let bal = await contract.methods.balanceOf(address).call()

    return bal
}

async function sendEther(address, amount, contract, web3){
    const tx = {
        from: address,
        to: contract.options.address,
        value: amount * (10 ** 18)
    }

    console.log("signing...")
    
    await web3.eth.signTransaction(tx, window.account.privateKey)

    console.log("signed")

    console.log("sending transaction...")

    await web3.eth.sendTransaction(tx)

    console.log("sent transaction")
}

async function withdrawEther(addressFrom, addressTo, amount, web3){
    const rawTx = {
        from: addressFrom,
        to: addressTo,
        value: amount * (10 ** 18),
        gas: 25000
    }

    const tx = new Transaction(rawTx, { chain: "ropsten" })

    let pk = Buffer.from(window.account.privateKey.replace("0x", ""), 'hex')

    console.log(pk.buffer)

    tx.sign(pk)

    let serializedTx = '0x' + tx.serialize().toString('hex');
    await web3.eth.sendSignedTransaction(serializedTx.toString("hex"), (err, hash) => {
        if (err) {
            console.log(err)
        } else {
            console.log(hash)
        }
    })
}

let toexport = { getBalance, sendEther, withdrawEther }

export default toexport