"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../src/components/ui/card"
import { Button } from "../src/components/ui/button"
import { Coins, Zap } from "lucide-react"
import { useState } from "react"

interface AirdropButtonProps {
  onAirdrop: () => void
  disabled?: boolean
}

export default function AirdropButton({ onAirdrop }: AirdropButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAirdrop = async () => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      onAirdrop()
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-500/30 shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-white">
          <Coins className="w-5 h-5 text-green-400" />
          <span>Free Airdrop</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm">Get 1 SOL for testing purposes. Limited to once per session on devnet.</p>

        <Button
          onClick={handleAirdrop}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg shadow-green-500/25"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Requesting...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Request 1 SOL Airdrop
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
