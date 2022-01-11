import React, { useState } from 'react';
import styles from '../../styles/Button.module.css';
import { ethers } from 'ethers';
import { authRequest } from '../../utils/apiRequest';

declare let window: any;

const ConnectWallet = () => {
    const [ account, setAccount ] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)
    const handleAuth = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            console.log("No wallet detected");
            return
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const chainId = await provider.getNetwork().then(({ chainId }) => chainId)
        authRequest(accounts[0], signer, setLoggedIn, chainId)
    }

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={handleAuth}> Connect Wallet</button>
            {loggedIn && <p>You are logged in as {account}</p>}
        </div>
    )
}

export default ConnectWallet
