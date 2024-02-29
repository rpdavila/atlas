"use client";
import { useEffect } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { updateAccessToken } from "../redux/features/userSlice";

type GraphQLProviderProps = {
  children: React.ReactNode;
};

// Add GraphQL client provider
export default function GraphQLProvider({ children }: GraphQLProviderProps) {
  const token = useAppSelector((state) => state.userInfo.accessToken);
  const dispatch = useAppDispatch();
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_Graph_QL_URI as string,
  });

  useEffect(() => {
    const getAccessToken = () => {
      dispatch(updateAccessToken());
    };
    const interval = setInterval(getAccessToken, 10 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
