import { useAppSelector } from "@/app/lib/ReduxSSR/hooks";


export default function UserDetail() {
  const user = useAppSelector((state) => state.userInfo);
  const userFirstName = user.customUserData?.firstName as string;
  const userLastName = user.customUserData?.lastName as string;

  
  return (
    <section className="flex flex-col bg-white rounded-lg">
      <h1 className="text-2xl">
        Hello {userFirstName} {userLastName}
      </h1>
    </section>
    
  );
}
