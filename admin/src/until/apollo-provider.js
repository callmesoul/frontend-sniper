
import Vue from "vue";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, from } from 'apollo-link'
import { onError } from 'apollo-link-error'
import store from '@/store'
import router from '@/router'
import { Message } from 'ant-design-vue'

Vue.use(VueApollo);

 // Create an http link:
 const link = new HttpLink({
   uri: `${process.env.VUE_APP_API_BASE_URL}/graphql`,
   fetch
 });

 const Middleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = store.state.token;
   if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
   }
  return forward(operation);
})

 const Afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // 服务器返回数据
    console.log('Afterware--response', response)
    return response
  })
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
  debugger
    graphQLErrors.map(({ message}) => {
      if(message.statusCode && message.statusCode === 401){
        Message.error('登录信息过期，请重新登陆');
        store.commit('LOG_OUT');
        router.push({name: 'login'})
      } else {
        Message.error(message)
      }
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});



 const client = new ApolloClient({
   link: from([Middleware,Afterware, errorLink, link]),
   cache: new InMemoryCache({
     addTypename: true
   })
 });



export const apolloProvider = new VueApollo({
    defaultClient: client,
})
