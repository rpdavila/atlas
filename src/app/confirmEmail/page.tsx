"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useApp } from "../hooks/useApp";

type ConfirmEmailProps = {
  token: string;
  tokenId: string;
};
export default function ConfirmEmail() {
  const initialState = {
    token: "",
    tokenId: "",
  };

  const app = useApp();
  const router = useRouter();
  const params = useSearchParams();
  const [tokens, setTokens] = useState<ConfirmEmailProps>(initialState);
  useEffect(() => {
    const getTokens = async () => {
      const token = params.get("token");
      const tokenId = params.get("tokenId");

      if (!token || !tokenId) {
        throw new Error(
          "Did you receive this link by Accident? Call customer service for more info at 123432142131"
        );
      } else {
        setTokens({ token, tokenId });
        await app?.emailPasswordAuth.confirmUser({ token, tokenId });
        setInterval(() => {
          router.push("/signIn");
        }, 20000);
      }
    };
    getTokens();
  }, [params, app?.emailPasswordAuth, router]);

  return (
    <>
      {tokens ? (
        <h1 className="flex justify-normal">Rerouting to Login Page</h1>
      ) : (
        <h1 className="flex justify-normal">
          Receiving your confirmation details
        </h1>
      )}
    </>
  );
}
