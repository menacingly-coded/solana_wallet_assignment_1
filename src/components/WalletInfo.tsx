"use client"

import { useState } from "react"

interface WalletInfoProps {
  publicKey: string
  balance: number
}

export default function WalletInfo({ publicKey, balance }: WalletInfoProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Wallet Information</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Connected</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Public Key</label>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border">
            <code className="flex-1 text-sm font-mono text-gray-800 break-all">
              <span className="hidden sm:inline">{publicKey}</span>
              <span className="sm:hidden">{truncateAddress(publicKey)}</span>
            </code>
            <button
              onClick={handleCopy}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Copy address"
            >
              {copied ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SOL Balance</label>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">◎</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{balance.toFixed(4)} SOL</div>
                <div className="text-sm text-gray-600">≈ ${(balance * 23.45).toFixed(2)} USD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
