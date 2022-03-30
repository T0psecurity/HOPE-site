// TODO: should be removed after adding any other function
export async function loadKeplrWallet(chainId: string): Promise<any> {
  if (!window.getOfflineSignerAuto) {
    throw new Error("Keplr extension is not available");
  }
  const signer = window.getOfflineSignerAuto(chainId);
  return Promise.resolve(signer);
}
