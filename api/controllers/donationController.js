const axios = require('axios')
const SEPOLIA_BASE_URL = 'https://api-sepolia.etherscan.io/api';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

exports.getDonations = async (req, res) => {
    const address = req.params.address.toLowerCase();

    try {
        const ethUrl = `${SEPOLIA_BASE_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
        const { data: ethData } = await axios.get(ethUrl);
        const ethTxs = ethData.result.filter(tx => tx.to?.toLowerCase() === address);

        const tokenUrl = `${SEPOLIA_BASE_URL}?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=1&offset=50&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
        const { data: tokenData } = await axios.get(tokenUrl);
        console.log("TOKENDATA: ", tokenData);

        if (tokenData.message !== "NOTOK") {
            const tokenTxs = tokenData.result.filter(tx => tx.to?.toLowerCase() === address) ?? [];

            const formatTx = tx => ({
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                amount: tx.value / 1e18,
                tokenSymbol: tx.tokenSymbol || 'ETH',
                timestamp: new Date(tx.timeStamp * 1000)
            });

            const allTxs = [...ethTxs, ...tokenTxs].map(formatTx).sort(
                (a, b) => b.timestamp - a.timestamp
            );

            res.json(allTxs);
        }
    } catch (err) {
        console.error('Error fetching donations:', err.message);
        res.status(500).json({ error: 'Greška pri dohvaćanju transakcija' });
    }
}
