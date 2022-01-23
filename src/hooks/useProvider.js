import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Contract, providers} from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import vyper_Ers20Abi from '../abi/vyper_ers20.json'
import vyperRouter from '../abi/vyperRouter.json'
import weth9Abi from '../abi/weth9.json'
import { useEffect, useState } from "react";

const infura = 'https://goerli.infura.io/v3/c2c3340ee9e34455830c53d3d3916704'

export const useProvider = () => {
    const [provider, setProvider] = useState()
    const [signer, setSigner] = useState()

    const gerProvider = async () => {
        const provider = window.ethereum ? new providers.Web3Provider(window.ethereum) : new providers.JsonRpcBatchProvider({url: infura});
        const signer = await provider.getSigner()
        setSigner((prevState) => {
            setProvider(provider)
            return signer
        })
    }
    useEffect(() => {
        gerProvider()
    }, [])

    return {provider, signer}
}