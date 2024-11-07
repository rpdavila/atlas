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
    <section className="flex items-center basis-3/4">
      <span className="flex justify-center items-center bg-slate-50 w-full h-1/2 rounded-lg"> Redirecting you to set up your profile in {count} seconds</span>
    </section>
  )
}