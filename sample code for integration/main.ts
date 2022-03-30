import { useOptions, cliffnetOptions } from './base';
import { CW20 } from './cw20-base';

/**
 * faucet 
 * curl --header "Content-Type: application/json"   --request POST   --data '{"denom":"upebble","address":"wasm133nmfrtqkmkan5cm22qtgsjjrdugk65vuptsz9"}' https://faucet.cliffnet.cosmwasm.com/credit
 */

async function main() {
    const [addr, client] = await useOptions(cliffnetOptions).setup('password');
    console.log(addr)
    const cw20 = CW20(client, cliffnetOptions);
    const codeId = 650; //await cw20.upload(addr, cliffnetOptions);
    const initMsg = {
        name: "Sheriff Token",
        symbol: "SHERIFF",
        decimals: 8,
        initial_balances: [
            {address: addr, amount: "100000000000000"}
        ],
        mint: {
            minter: addr,
        }
    };

    const contract = await cw20.instantiate(addr, codeId, initMsg, "SHERIFF TOKEN", cliffnetOptions);
    console.log("🚀 ~ file: main.ts ~ line 26 ~ main ~ contract", contract)

    const totalBalance = await contract.balance(contract.contractAddress);
    console.log("🚀 ~ file: main.ts ~ line 29 ~ main ~ totalBalance", totalBalance)
    
    const balance = await contract.balance(addr);
    console.log("🚀 ~ file: main.ts ~ line 32 ~ main ~ balance", balance)
    
}

main()