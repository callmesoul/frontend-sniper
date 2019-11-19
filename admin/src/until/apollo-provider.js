
import Vue from "vue";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import store from '@/store'

Vue.use(VueApollo);

const getHeaders = () => {
  const headers = {};
   const token = store.state.token;
   if (token) {
     headers.authorization = `Bearer ${token}`;
   }
   return headers;
 };
 // Create an http link:
 const link = new HttpLink({
   uri: `${process.env.VUE_APP_API_BASE_URL}/graphql`,
   fetch,
   headers: getHeaders()
 });

 const client = new ApolloClient({
   link: link,
   cache: new InMemoryCache({
     addTypename: true
   })
 });



export const apolloProvider = new VueApollo({
    defaultClient: client,
})
