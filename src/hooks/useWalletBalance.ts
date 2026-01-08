import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { formatEther } from 'viem';
import { scrollSepolia } from 'viem/chains';

export function useWalletBalance(address?: string) {
    const [ethBalance, setEthBalance] = useState<string>('0.00');
    const [ecoBalance, setEcoBalance] = useState<string>('0.00');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!address) {
            setEthBalance('0.00');
            return;
        }

        fetchBalance();

        // Refresh every 30 seconds
        const interval = setInterval(fetchBalance, 30000);
        return () => clearInterval(interval);
    }, [address]);

    const fetchBalance = async () => {
        if (!address) return;

        try {
            setLoading(true);

            // Fetch ETH balance using viem
            const response = await fetch(
                `https://sepolia-rpc.scroll.io/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_getBalance',
                        params: [address, 'latest'],
                        id: 1,
                    }),
                }
            );

            const data = await response.json();

            if (data.result) {
                const balanceInWei = BigInt(data.result);
                const balanceInEth = formatEther(balanceInWei);
                setEthBalance(parseFloat(balanceInEth).toFixed(4));
            }

            // ECO balance would come from smart contract or Supabase
            // For now, we'll use total_earnings from user profile
            // This will be updated when we integrate the actual ECO token

        } catch (error) {
            console.error('Error fetching balance:', error);
            setEthBalance('0.00');
        } finally {
            setLoading(false);
        }
    };

    return {
        ethBalance,
        ecoBalance,
        loading,
        refresh: fetchBalance,
    };
}
