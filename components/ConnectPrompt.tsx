"use client"

import { Card, CardContent } from "../src/components/ui/card"
import { Button } from "../src/components/ui/button"
import { Wallet, Shield, Zap, ArrowRight } from "lucide-react"

interface ConnectPromptProps {
  onConnect: () => void
}

export default function ConnectPrompt({ onConnect }: ConnectPromptProps) {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/25">
          <Wallet className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl font-bold text-white">Connect Your Solana Wallet</h1>

        <p className="text-xl text-gray-300 max-w-md mx-auto">
          Access your SOL balance, request airdrops, and send transactions securely
        </p>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Secure</h3>
              <p className="text-sm text-gray-300">Your keys never leave your wallet</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-lg bg-green-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold text-white">Fast</h3>
              <p className="text-sm text-gray-300">Lightning-fast Solana transactions</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">Easy</h3>
              <p className="text-sm text-gray-300">Simple and intuitive interface</p>
            </div>
          </div>

          <Button
            onClick={onConnect}
            size="lg"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/25 text-lg py-6"
          >
            <Wallet className="w-5 h-5 mr-3" />
            Connect Phantom Wallet
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>

          <p className="text-xs text-gray-400 mt-4">
            Don't have Phantom?{" "}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Download here
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
