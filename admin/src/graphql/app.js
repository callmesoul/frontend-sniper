import gql from 'graphql-tag';

export const UserApps = gql `
    query{
        userApps{
            id,
            name,
            domain,
            isNotify
        }
    }
`

export const CreateApp = gql `
    mutation($name: String!, $domain: String!, $isNotify: Boolean!){
        createApp(input:{name: $name, domain: $domain, isNotify: $isNotify}){
            id,
            name,
            domain,
            isNotify
        }
    }
`