"use client"

import { Card, CardContent } from "../src/components/ui/card"
import { Copy, Eye, EyeOff } from "lucide-react"
import { Button } from "../src/components/ui/button"
import { useState } from "react"

interface WalletInfoProps {
  publicKey: string
  balance: number
}

export default function WalletInfo({ publicKey, balance }: WalletInfoProps) {
  const [showFullKey, setShowFullKey] = useState(false)

  const maskPublicKey = (key: string) => {
    if (showFullKey) return key
    return `${key.slice(0, 4)}...${key.slice(-4)}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Wallet Address</h3>
            <div className="flex items-center space-x-2">
              <code className="text-white font-mono text-sm bg-black/20 px-3 py-2 rounded-lg flex-1">
                {maskPublicKey(publicKey)}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowFullKey(!showFullKey)}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                {showFullKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyToClipboard}
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">SOL Balance</h3>
            <div className="text-3xl font-bold text-white">
              {balance.toFixed(4)} <span className="text-lg text-gray-300">SOL</span>
            </div>
            <p className="text-sm text-gray-400">≈ ${(balance * 23.45).toFixed(2)} USD</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
