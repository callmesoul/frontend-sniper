import gql from'graphql-tag';

export const Register = gql`
    mutation($username: String!, $password: String!, $email: String!) {
        register(input: { username: $username, password: $password, email: $email }){
            username
        }
    }
`