import util from "util";
import { exec } from "child_process";
import { exit } from "process";

async function executeCommand (commandString: string, continueWithError?: boolean): Promise<string | [string, string]> {
    const {stdout, stderr}: {stdout: string, stderr: string} = await util.promisify(exec)(commandString);
    if (stderr && !continueWithError) {
        console.error(`error in ${commandString} \n`, stderr);
        exit(1);
    }
    return continueWithError? [stdout, stderr] : stdout;
}



async function execute() {
    // setting cliffnet network configuration
    await executeCommand('sudo source <(curl -sSL https://raw.githubusercontent.com/CosmWasm/testnets/master/cliffnet-1/defaults.env)');

    // setting environment parameters
    console.log('setting environment parameters');
    await executeCommand('export NODE="--node $RPC"');
    await executeCommand('TXFLAG="${NODE} --chain-id ${CHAIN_ID} --gas-prices 0.025upebble --gas auto --gas-adjustment 1.3"');

    // store the bytecode on chain
    // gas is huge to wasm size... but auto-zipping reduced this from 1.8M to around 600k
    const res = await executeCommand('RES=$(wasmd tx wasm store wasms/cw_erc20.wasm --from wallet $TXFLAG -y --output json -b block)');
    console.log("🚀 ~ file: executeCommand.ts ~ line 25 ~ execute ~ res", res)

    // get the codeid
    const codeId = await executeCommand('CODE_ID=$(echo $RES | jq -r ".logs[0].events[-1].attributes[0].value")');
    console.log("🚀 ~ file: executeCommand.ts ~ line 29 ~ execute ~ codeId", codeId)
    // await executeCommand('');
    // await executeCommand('');
    // await executeCommand('');

}

execute();