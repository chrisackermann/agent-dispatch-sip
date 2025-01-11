"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleConnect = () => {
    fetch(`/api/dispatch-agent?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phoneNumber)}`)
      .then(response => response.json())
      .then(data => console.log('Agent dispatched:', data))
      .catch(error => console.error('Error dispatching agent:', error))
    console.log(`Connecting agent for: ${name} with phone: ${phoneNumber}`)
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Speak with an agent</CardTitle>
          <p className="text-sm text-muted-foreground">Enter your details below to receive a call from our agent</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
            />
            <Button onClick={handleConnect}>
              Go!
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
