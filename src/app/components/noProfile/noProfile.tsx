"use client"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
export default function NoProfile() {
  const [count, setCount] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)

    if (count === 0) {
      redirect("/dashboard/userProfile")
    }

    return () => clearInterval(interval)
  }, [count])
  return (
    <section className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-8 shadow-lg text-center">
        <p className="text-slate-100 text-lg">Redirecting you to set up your profile in <span className="font-bold text-blue-400">{count}</span> seconds</p>
      </div>
    </section>
  )
}