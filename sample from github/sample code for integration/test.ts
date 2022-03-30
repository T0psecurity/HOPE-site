import { useOptions, cliffnetOptions } from './base';
import { CW20 } from './cw20-base';

/**
 * faucet 
 * curl --header "Content-Type: application/json"   --request POST   --data '{"denom":"upebble","address":"wasm133nmfrtqkmkan5cm22qtgsjjrdugk65vuptsz9"}' https://faucet.cliffnet.cosmwasm.com/credit
 */

async function main() {
    const [addr, client] = await useOptions(cliffnetOptions).setup('password');
    const contract = await client.getContract("wasm1w32zzt47yzksm4sl295h0d3zu0w773t8dmhjq9gqmrhxled8dhaqn3fw6w");
    console.log("🚀 ~ file: test.ts ~ line 12 ~ main ~ contract", contract)
    const balance = await client.queryContractSmart(addr, { balance: { address: addr } });
    console.log("🚀 ~ file: test.ts ~ line 14 ~ main ~ balance", balance)
}

main()