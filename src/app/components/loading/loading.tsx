import { Spinner } from "@heroui/react"

export default function Loading() {
  return (
    <section className="flex flex-col justify-center items-center min-h-[60vh] w-full space-y-4">
      <Spinner color="primary" size="lg" />
      <p className="text-slate-200 text-lg">Loading...</p>
    </section>
  )
}
