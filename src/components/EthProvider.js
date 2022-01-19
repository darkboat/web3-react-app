import React from "react"

import getWeb3 from "../getWeb3";

import CandyCaneToken from "../contracts/CandyCane"
import NFTToken from "../contracts/ChristmasChad.json"

import SCManager from "../SCManager/SCManager"

import migrations from "../migrate.json"

export default class EthProvider extends React.Component {
    state = {
        maxNFTNumber: 200,
        exchangeEth: null,
        createChamp: null,
        spendTokens: null,
        giveTokens: null,
        token_decimals: null, 
        balance: null, 
        web3: null, 
        contract: null,
        nftContract: null,
        processingTransaction: false,
        transferAmount: null,
        ownedNFTS: null
        };

    constructor(){
        super()

        this.spendTokens = this.spendTokens.bind(this)
        this.giveTokens = this.giveTokens.bind(this)
        this.mintRandomChamp = this.mintRandomChamp.bind(this)
        this.getRandomNFTNumber = this.getRandomNFTNumber.bind(this)
        this.getUnregisteredNFTS = this.getUnregisteredNFTS.bind(this)
        this.mintChamp = this.mintChamp.bind(this)
        this.isUnregisteredNFT = this.isUnregisteredNFT.bind(this)
        
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Get the contract instance.
            const instance = new web3.eth.Contract(
            CandyCaneToken.abi,
            migrations.addresses[1],
            );
            const nftContract = new web3.eth.Contract(NFTToken.abi, 
            migrations.addresses[2]
            );

            let nftList = await nftContract.methods.getOwnedNFTS(window.account.address).call()

            this.setState({ 
            contract: instance, 
            nftContract,
            web3, 
            ownedNFTS: nftList
            })

            this.resetState(instance)
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    async withdrawEthereum(address, amount){
        SCManager.withdrawEther(window.account.address, address, amount, window.web3)
    }

    async getUnregisteredNFTS() {
        let unregistered = []

        for (let i = 0; i<this.state.maxNFTNumber; i++){
            unregistered.push(i + 1)
        }

        let registeredNFTS = await this.state.nftContract.methods.getRegisteredNFTS().call()

        registeredNFTS.forEach(nft => {
            let index = unregistered.indexOf(nft.tokenNumber)
            delete unregistered[index]
        })

        return unregistered
    }

    async getRandomNFTNumber() {
        let found = []

        let registeredNFTS = await this.state.nftContract.methods.getRegisteredNFTS().call()

        for (let i = 0; i<this.state.maxNFTNumber; i++) {
            let isRegistered = false
            registeredNFTS.forEach(nft => {
                if(nft.tokenNumber === i) {
                    isRegistered = true
                }
            })

            if (!isRegistered){
                found.push(i)
            }
        }

        return found[Math.floor(Math.random() * found.length)]
    }

    async mintChamp(address, tokenId, self){
        let bal = await this.state.web3.eth.getBalance(address)

        bal = await this.state.web3.utils.fromWei(bal, "ether")

        if(bal >= 0.02) {
            await SCManager.sendEther(address, 0.02, this.state.nftContract, this.state.web3)
            await this.state.nftContract.methods.mint(address, `https://raw.githubusercontent.com/darkboat/nft-game/main/Christmas%20Chads%20%23${tokenId}.png`).send({ from: address })
            window.location.reload()
        } else {
            self.setState({ error: "insufficient balance in wallet"})
        }
    }

    async mintRandomChamp(address) {
        let bal = await this.state.web3.eth.getBalance(address)

        bal = await this.state.web3.utils.fromWei(bal, "ether")

        let number = await this.getRandomNFTNumber()
        
        if(bal >= 0.02) {
            await SCManager.sendEther(address, 0.02, this.state)
            await this.state.nftContract.methods.mint(address, `https://raw.githubusercontent.com/darkboat/nft-game/main/Christmas%20Chads%20%23${number}.png`).send({ from: address })
            window.location = "/app"
        }
    }

    async spendTokens(address, amount) {
        this.setState({ processingTransaction: true })
        await this.state.contract.methods.burn(address, amount).send({ from: address })
        this.setState({ processingTransaction: false })
        this.resetState()
        // window.location.reload()
    }

    async giveTokens(address, amount){
        this.setState({ processingTransaction: true })
        await this.state.contract.methods.mint(address, amount).send({ from: address })
        this.setState({ processingTransaction: false })
        this.resetState()
        window.location.reload()
    }

    async isUnregisteredNFT(tokenId){
        let unregistered = await this.getUnregisteredNFTS()

        return unregistered.includes(tokenId)
    }

    async resetState(){
        let bal = await SCManager.getBalance(window.account.address, this.state.contract)
        let dec = await this.state.contract.methods.decimals().call()

        this.setState({ token_decimals: dec, balance: bal });
    }

    render() {
        if (window.ethereum){
            let component = React.cloneElement(this.props.component, {...this.props.component.props, ethprovider: this})
            return (
                this.state.nftContract != null ? 
                <div>
                    {component}
                </div>
                : <h3>loading ethereum provider...</h3>
            )
        } else {
            if (!window.location.includes("/account/login") && !window.location.includes("/account/create")){
                window.location = "/account/login"
            }
        }
    }
}