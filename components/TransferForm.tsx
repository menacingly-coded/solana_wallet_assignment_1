"use client"

import type React from "react"
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "../src/components/ui/card"
import { Button } from "../src/components/ui/button"
import { Input } from "../src/components/ui/input"
import { Label } from "../src/components/ui/label"
import { Send, AlertCircle } from "lucide-react"

interface TransferFormProps {
  balance: number
  maxAmount: number
  disabled?: boolean
  onTransfer: (recipient: string, amount: number) => Promise<boolean>
}

export default function TransferForm({ balance, maxAmount, disabled, onTransfer }: TransferFormProps) {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const transferAmount = Number.parseFloat(amount)

    if (!recipient.trim()) {
      setError("Please enter a recipient address")
      return
    }

    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (transferAmount > balance) {
      setError("Insufficient balance")
      return
    }

    setIsLoading(true)

    const success = await onTransfer(recipient, transferAmount)
    if (success) {
      setRecipient("")
      setAmount("")
    }

    setIsLoading(false)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-white">
          <Send className="w-5 h-5 text-blue-400" />
          <span>Send SOL</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-gray-300">
              Recipient Address
            </Label>
            <Input
              id="recipient"
              type="text"
              placeholder="Enter Solana wallet address..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
              disabled={disabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-300">
              Amount (SOL)
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.0001"
                placeholder="0.0000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/20 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 pr-16"
                disabled={disabled}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setAmount(maxAmount.toString())}
                className="absolute right-1 top-1 h-8 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                disabled={disabled}
              >
                MAX
              </Button>
            </div>
            <p className="text-xs text-gray-400">Available: {balance.toFixed(4)} SOL</p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || disabled || !recipient.trim() || !amount}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-blue-500/25"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send SOL
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
