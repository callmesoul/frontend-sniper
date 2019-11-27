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

export const UpdateApp = gql `
    mutation($id: String!, $name: String!, $domain: String!, $isNotify: Boolean!){
        updateApp(input:{id: $id, name: $name, domain: $domain, isNotify: $isNotify}){
            id,
            name,
            domain,
            isNotify
        }
    }
`



export const RemoveApp = gql `
    mutation($id: String!){
        removeApp(id: $id)
    }
`