import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Contract, providers} from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import vyper_Ers20Abi from '../abi/vyper_ers20.json'
import vyperRouter from '../abi/vyperRouter.json'
import weth9Abi from '../abi/weth9.json'

const infura = 'https://goerli.infura.io/v3/c2c3340ee9e34455830c53d3d3916704'

const axiosBaseQuery =
  ({ contractAddress } = { contractAddress: '' }) =>
  async ({ method, data = [], newContractAddress = '' }) => {
    const provider = window.ethereum ? new providers.Web3Provider(window.ethereum) : new providers.JsonRpcBatchProvider({url: infura});
    const signer = await provider.getSigner()
    const contract = new Contract(newContractAddress ? newContractAddress : contractAddress, weth9Abi, signer)
    console.log(method,data,newContractAddress, contract);
    try {
      const result = await buildQuery(contract[method], data, false)  
      return { data: result }
    } catch (axiosError) {
      let err = axiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }

export const $api = createApi({
  reducerPath: "contractApi",
  tagTypes: ['allowanceWeth9'],
  baseQuery: axiosBaseQuery({contractAddress: '0xd7fE9081b13C030A8b51FE8b809151407e1B965A'}),
  endpoints: (build) => ({
    testFetch: build.query({
      query: (body) => {
          return {
            method: 'userInfo',
            data: ['0', '0xF3Bc8C5F2A857d68D5809f02352C9d73656d74D4']
        }
      }
    }),
    allowanceWeth9: build.query({
        query: (body) => {
            return {
              method: 'allowance',
              data: ['0xF3Bc8C5F2A857d68D5809f02352C9d73656d74D4', '0xd7fE9081b13C030A8b51FE8b809151407e1B965A'],
              newContractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
          }
        }, 
        providesTags: ['allowanceWeth9'],
      }),
    approveWeth9: build.mutation({
        query: () => {
            return {
              method: 'approve',
              data: ['0xd7fE9081b13C030A8b51FE8b809151407e1B965A', '1'],
              newContractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'
          }
        },
        invalidatesTags: ['allowanceWeth9']
      }),
  }),
});

export const { useTestFetchQuery, useApproveWeth9Mutation, useAllowanceWeth9Query } = $api;

export const buildQuery = async(
    method,
    args = [],
    estimateGas,
    options = {}
  ) => {
    try {
      let tx;
      if (estimateGas) {
        const gasLimit = await estimateGas(...args, options);
        tx = await method(...args, {
          gasLimit: calculateGasMargin(gasLimit),
          ...options
        });
      } else {
        tx = await method(...args, options);
      }
      if (tx?.wait) {
        return tx.wait(1);
      }
      return tx;
    } catch (err) {
      if (estimateGas) {
        console.log(`Method error: ${args}`);
        throw new Error(err.error?.message || err.message || err);
      }
      console.log(`Method error: ${args}`);
      throw new Error(err.error?.message || err.message || err);
    }
  };
 

  export const getContract = (
    address,
    ABI,
    library,
    account
  ) => {
    if (!isAddress(address)) {
      throw Error(`Invalid 'address' parameter '${address}'.`);
    }
  
    // return new ethers.Contract(address, ABI, library && (getProviderOrSigner(library, account)));
  };

  function calculateGasMargin (gasLimit) {
      console.log(gasLimit.toString());

  }
  function getProviderOrSigner () {}