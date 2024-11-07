import { auth } from "@/auth"

export default async function UserDetail() {
  const session = await auth();

  return (
    <section className="flex flex-col justify-evenly items-center text-2xl bg-white rounded-lg basis-3/4 sm:flex- sm:flex-wrap">
      <h1>
        Hello {session?.user?.name}
      </h1>
      <section>
        <p>Number of instruments</p>
        <p># of instruments available school wide</p>
        <p># of instruments available district wide</p>
      </section>
    </section>

  );
}
