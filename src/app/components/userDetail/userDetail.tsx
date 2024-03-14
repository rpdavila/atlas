import { useAppSelector } from "@/app/redux/hooks";

export default function UserDetail() {
  const user = useAppSelector((state) => state.userInfo);
  const userFirstName = user.customUserData?.firstName as string;
  const userLastName = user.customUserData?.lastName as string;
  return (
    <h1>
      Hello {userFirstName} {userLastName}
    </h1>
  );
}
