import { coins } from "@cosmjs/proto-signing";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  useAppDispatch,
  // useAppSelector
} from "../app/hooks";
import {
  importContract,
  // contractAccounts,
  // deleteAccount,
} from "../features/accounts/accountsSlice";
import connectionManager from "../features/connection/connectionManager";
import { toMicroAmount } from "../util/coins";

export const contractAddresses: any = {
  MINT_CONTRACT:
    // "juno1u230upl8ut7vn8uyk7hd9ac2ygwrvk5jygsjzv838hkn2u4xj34slyg2qy",
    "juno17kr4uahqlz8hl8nucx82q4vmlj7lrzzlz0yr0ax9hejaevw6ewqsf8p5ux",
  TOKEN_CONTRACT:
    // "juno1ckulym5ufeu29kqcqn0pw7qfavdmup9a9kwt9uzgt4arkq84qetssd9ltl",
    "juno1re3x67ppxap48ygndmrc7har2cnc7tcxtm9nplcas4v0gc3wnmvs3s807z",
  NFT_CONTRACT:
    // "juno145929ngssuymkmflf9wrpprvwsh98048lpmgpp32uhpyptcca4us6pmxap",
    "juno1ccl3kw74hl3ez4ljhx0qzwe7hl8egqcsc2mcjkgga3af86jjek0q9645r8",
  REVEAL_CONTRACT:
    // "juno15wtyhh6nue4vuv0tqk3wclr2umn96sd3va73u0srpuc647ns0hgq4r5t36",
    "juno19p4e3y2nnh7jp7wlh6z5pyxve3wrxc5xzcca9hs6nsvtgmlxpadqlzhm07",
  REVEAL_NFT_CONTRACT:
    "juno1lqtavuw24dnnu56w79k7mefn8fhuz2w247dks2fes6hwd4rhpu2sumhhap",
  REVEAL_MARKET_CONTRACT:
    "juno1m9rrvcdjatkvvdmly6pxq3yvxkp8ufaf23qkqvjcgzjgaxsef3ns6xe994",
  STAKING_OLD_CONTRACT:
    "juno1hlrdjqs0jst7lq46h6sak7fwjjnta65emr9gaftynpvkqahxghjsw0zmvw",
  STAKING_CONTRACT:
    "juno1ff6jly3enug0lffyj6423yr8m7fs69p2pzqwl9zwx9udcfqq4tsqwztq08",

  MINT_CONTRACT_2:
    "juno17jeytk2c2qfz9lpggsn9hyayx3f2h9qx482c8uahmruwejk8hpvsjjj402",
  NFT_CONTRACT_2:
    "juno1x5kqvep2fq5sgvwwjn9uctzn0ts8vxnrtalxjucs5juu07hxxsvqgseuhr",
};

const useContract = () => {
  const dispatch = useAppDispatch();
  // const contracts = useAppSelector(contractAccounts);

  const state = useSelector((state: any) => state);

  const initContracts = useCallback(() => {
    // remove existing contracts
    // if (contracts.length) {
    //   for (let i = 0; i < contracts.length; i++) {
    //     const contract = contracts[i];
    //     dispatch(deleteAccount(contract.address));
    //   }
    // }

    // import target contracts
    console.log("contractAddress: ", contractAddresses);
    Object.keys(contractAddresses).map((key: string) => {
      dispatch(importContract(contractAddresses[key]));
      return null;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runQuery = useCallback(
    // async (contractAddress: string, queryMsg: any) => {
    async (contract: any, queryMsg: any) => {
      // const contract = state.accounts.accountList[contractAddress];
      if (!contract) {
        // dispatch(importContract(contractAddress));
        throw new Error("No contract selected");
      }
      const client = await connectionManager.getQueryClient(
        state.connection.config
      );
      const result = await client.queryContractSmart(
        contract.address,
        queryMsg
      );
      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const runExecute = useCallback(
    async (
      contractAddress: string,
      executeMsg: any,
      option?: {
        memo?: string;
        funds?: string;
      }
    ) => {
      const contract = state.accounts.accountList[contractAddress];
      const account = state.accounts.keplrAccount;

      if (!contract) {
        throw new Error("No contract selected");
      }

      const client = await connectionManager.getSigningClient(
        account,
        state.connection.config
      );

      const executeOptions = state.console.executeOptions;
      const executeMemo = option?.memo ?? executeOptions?.memo;
      const executeFunds = option?.funds ?? executeOptions?.funds;

      return client.execute(
        account.address,
        contract.address,
        executeMsg,
        "auto",
        executeMemo,
        executeFunds
          ? coins(
              toMicroAmount(
                executeFunds,
                state.connection.config["coinDecimals"]
              ),
              state.connection.config["microDenom"]
            )
          : undefined
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    initContracts,
    runQuery,
    runExecute,
  };
};

export default useContract;
