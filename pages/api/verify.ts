import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

type Query = {
    address: string;
    signature: string;
    message: string
}

export default function handler(req:NextApiRequest, res: NextApiResponse) {
    let authenticated = false;
    const { address, signature, message } = req.body as Query;
    const decodedAddress = ethers.utils.verifyMessage(message, signature)
    if (address === decodedAddress.toLowerCase()) authenticated = true
    console.log({ address, signature, message })
    res.status(200).json({ authenticated })
}
