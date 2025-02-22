import { Spinner } from "@heroui/react"

export default function Loading() {
  return (
    <section className="flex justify-center items-center h-screen w-full">
      <Spinner color="white" size="lg" />
    </section>
  )
}
