'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import the OptionChain component with no SSR
const OptionChainApp = dynamic(
  () => import('../components/OptionChain'),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <Suspense fallback={<div className="loading">Loading option chain...</div>}>
        <OptionChainApp />
      </Suspense>
    </main>
  )
}