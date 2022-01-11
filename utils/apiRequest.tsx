import { ethers } from "ethers";

export const authRequest = async (address:string, signer: ethers.Signer, setLoggedIn: any, chainId: number) => {
    const response = await fetch(`/api/auth?address=${address}`);
    const data = await response.json();
    console.log(data);

    const message = `
        ${window.location.host} wants to sign in with your Ethereum account: ${address}

        URI: ${document.location.origin}
        Version: 1
        Nonce: ${data.nonce}
        Issued At: ${Date.now()}
        Expiration Time: X
        Chain ID: ${chainId}
    `

    const signature = await signer.signMessage(message);

    // const signature = await signer.signMessage(`Hello ${data.nonce}`);
    console.log({ address, signature, message });
    verifyRequest(address, signature, message, setLoggedIn);
}

const verifyRequest = async (address:string, signature: string, message: string, setLoggedIn: any) => {
    const response = await fetch(`/api/verify`, {
        method: "POST",
        body: JSON.stringify({
            address,
            signature,
            message
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
    setLoggedIn(data.authenticated)
}
