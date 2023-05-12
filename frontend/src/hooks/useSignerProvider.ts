import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { address } from "../abi/address.json"
import abi from "../abi/abi.json"

const useSignerProvider = () => {

    const [signerProvider, setSignerProvider] = useState<ethers.providers.Web3Provider|undefined>(undefined)
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner|undefined>(undefined)
    const [signerContract, setSignerContract] = useState<ethers.Contract|undefined>(undefined)

    const _provider = new ethers.providers.Web3Provider(window.ethereum)
    const _signer = _provider.getSigner()
    const _contract = new ethers.Contract(address, abi, _signer)

    useEffect(() => {
        setSigner(_signer)
        setSignerContract(_contract)
        setSignerProvider(_provider)
    }, [])

    return {signer, signerProvider, signerContract}
}

export default useSignerProvider