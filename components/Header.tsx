"use client"

import { Button } from "../src/components/ui/button"
import { Wallet, LogOut } from "lucide-react"

interface HeaderProps {
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
}

export default function Header({ isConnected, onConnect, onDisconnect }: HeaderProps) {
  return (
    <header className="relative z-20 border-b border-white/10 backdrop-blur-md bg-white/5">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SolanaWallet</h1>
              <p className="text-sm text-gray-300">Decentralized Finance</p>
            </div>
          </div>

          {isConnected ? (
            <Button
              onClick={onDisconnect}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          ) : (
            <Button
              onClick={onConnect}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/25"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Phantom
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
