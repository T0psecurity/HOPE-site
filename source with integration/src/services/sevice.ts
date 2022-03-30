import {
  BankBalancesResponse,
  BroadcastMode,
  LcdClient,
  setupAuthExtension,
  setupBankExtension,
  SigningCosmosClient,
  BroadcastTxResult,
  StdFee,
  coins,
} from "@cosmjs/launchpad";
import { CosmWasmClient, MsgExecuteContract } from '@cosmjs/cosmwasm';
import { config } from "../config";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { AppConfig } from "./config";
import { useSdk } from "@cosmicdapp/logic";

import {  CosmWasmFeeTable } from "@cosmjs/cosmwasm-stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { defaultGasLimits as defaultStargateGasLimits, GasLimits, GasPrice } from "@cosmjs/stargate";
import { OfflineSigner } from "@cosmjs/proto-signing";


const testnet: AppConfig = {
  chainId: "lucina",
  chainName: "Juno Tesnet",
  addressPrefix: "juno",
  rpcUrl: "https://rpc.juno.giansalex.dev",
  httpUrl: "https://lcd.juno.giansalex.dev",
  token: {
    coinDenom: "JUNOX",
    coinDecimals: 6,
    coinMinimalDenom: "ujunox"
  },
  gasPrice: 0.025,
  codeId: 4,
  contract: "juno1z6td3jl80w8xlenan3ms743ky0ld2m9lnhm48jnkjthvqm4cuwrs8wzxcd",
  marketContract: "juno16te3h0x8gnwhlunhh383j2jqsv4q556x22gtj0"
};


const client = LcdClient.withExtensions(
    { apiUrl: testnet.httpUrl, broadcastMode: BroadcastMode.Block },
    setupAuthExtension,
    setupBankExtension
  );
const chainId = testnet.chainId;
const wasmClient = new CosmWasmClient(testnet.httpUrl, BroadcastMode.Block);

export const getAccount = async() =>{
  let anyWindow :any =window;
  const offlineSigner = anyWindow.getOfflineSigner(testnet.chainId);
  const accounts = await offlineSigner.getAccounts();
  const balance = await client.bank.balances(accounts[0].address); 
  console.log(balance);
}

export const  queryContractInfo = async ()  => {
  console.log(await  wasmClient.queryContractSmart(testnet.contract, { get_contract_info : {  } }))
    return wasmClient.queryContractSmart(testnet.contract, { get_contract_info : {  } });
}

export const queryTokenInfo = async () =>{
  let anyWindow :any =window;
  const offlineSigner = anyWindow.getOfflineSigner(testnet.chainId);
  const accounts  = await offlineSigner.getAccounts();
  let address = accounts[0].address;
  return wasmClient.queryContractSmart(testnet.contract, { get_token_info : { address } });
}


export async function createClient(config: AppConfig, signer: OfflineSigner): Promise<SigningCosmWasmClient> {
  const gasLimits: GasLimits<CosmWasmFeeTable> = {
    ...defaultStargateGasLimits,
    upload: 1500000,
    init: 600000,
    exec: 400000,
    migrate: 600000,
    send: 80000,
    changeAdmin: 80000,
  };

  return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
    prefix: config.addressPrefix,
    gasPrice: GasPrice.fromString(`${config.gasPrice}${config.token.coinMinimalDenom}`),
    gasLimits: gasLimits,
  });
}

export const setMaximum= async () =>{
    let anyWindow :any =window;
    const offlineSigner:OfflineSigner = anyWindow.getOfflineSigner(testnet.chainId);
    const accounts = await offlineSigner.getAccounts();
    const sender_address = accounts[0].address;
    const client = await createClient(testnet,offlineSigner);
    console.log(client);
   // client.execute()
    let result = await client.execute(sender_address,testnet.contract,{set_maximum_nft:{amount:"6"}});
    console.log(result);
    //return client.signAndBroadcast([msg], fee);
}