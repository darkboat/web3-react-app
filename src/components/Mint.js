import React from "react"

import withRouter from "../utils/withRouter"

import "../css/theme.css"
import "../css/mint.css"

export default withRouter(class Mint extends React.Component {
    state = {
        unregisteredNFTS: [],
        error: ""
    }

    async componentDidMount() {
        let unregisteredNFTS = await this.props.ethprovider.getUnregisteredNFTS()

        this.setState({ unregisteredNFTS })
    }

    render() {
        if(this.props.router.params.tokenId){
            let nftTokenNumber = this.props.router.params.tokenId

            return (
                <div className="center">
                    <h1>Christmas Chads #{nftTokenNumber}</h1>
                    <img alt="" style={{ width: "50%", borderRadius: "15%" }} src={`https://github.com/darkboat/nft-game/blob/main/Christmas%20Chads%20%23${nftTokenNumber}.png?raw=true`} />
                    <br />
                    <p style={{ color: "red", fontSize: "20px" }}>{this.state.error}</p>
                    <br />
                    <button onClick={async () => {
                        let alreadyMinted = await this.props.ethprovider.isUnregisteredNFT(nftTokenNumber)

                        if(!alreadyMinted){                            
                            this.props.ethprovider.mintChamp(window.account.address, parseInt(nftTokenNumber), this)
                        }
                    }}>Mint NFT</button>
                </div>
            )
        } else {
            return (
                <div style={{ marginLeft: "40px" }}>
                    <h1 style={{ marginLeft: "35vw", fontSize: "50px" }}>MINT AN NFT</h1>
                    {this.state.unregisteredNFTS.map(nftTokenNumber => {
                        return <img alt="" onClick={() => {
                            window.location = `/mint/view/${nftTokenNumber}`
                        }} style={{ width: "30%", borderRadius: "15%", padding: "15px 15px 15px 15px" }} key={`img#${nftTokenNumber + 1}`} src={`https://github.com/darkboat/nft-game/blob/main/Christmas%20Chads%20%23${nftTokenNumber}.png?raw=true`} />
                    })}
                </div>
            )
        }
    }
})