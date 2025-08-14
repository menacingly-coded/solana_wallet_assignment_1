"use client"

import { useState } from "react"
import Header from "../components/Header"
import WalletInfo from "../components/WalletInfo"
import AirdropButton from "../components/AirdropButton"
import TransferForm from "../components/TransferForm"
import ConnectPrompt from "../components/ConnectPrompt"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [publicKey, setPublicKey] = useState("")
  const [balance, setBalance] = useState(0)

  const handleConnect = () => {
    setIsConnected(true)
    setPublicKey("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU")
    setBalance(2.45)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setPublicKey("")
    setBalance(0)
  }

  const handleAirdrop = () => {
    setBalance((prev) => prev + 1)
  }

  const handleTransfer = async (recipient: string, amount: number): Promise<boolean> => {
    try {
      console.log("Transferring", amount, "SOL to", recipient)
      setBalance((prev) => prev - amount)
      return true
    } catch (error) {
      console.error("Transfer failed:", error)
      return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5" />

      <Header isConnected={isConnected} onConnect={handleConnect} onDisconnect={handleDisconnect} />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {isConnected ? (
          <div className="max-w-4xl mx-auto space-y-8">
            <WalletInfo publicKey={publicKey} balance={balance} />

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <AirdropButton onAirdrop={handleAirdrop} />
              </div>

              <div>
                <TransferForm
                  balance={balance}
                  maxAmount={balance}
                  onTransfer={handleTransfer}
                  disabled={!isConnected}
                />
              </div>
            </div>
          </div>
        ) : (
          <ConnectPrompt onConnect={handleConnect} />
        )}
      </main>
    </div>
  )
}
