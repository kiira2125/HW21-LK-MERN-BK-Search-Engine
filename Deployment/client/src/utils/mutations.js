import { gql } from '@apollo/client';

// LOGIN USER
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;


// ADD USER MUTATION
export const ADD_USER = gql`
    mutation addUser($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password) {
            _id
            email
            password
        }
    }
`;

// SAVE BOOK MUTATION
export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $bookId: ID!) {
        saveBook(userId: $userId, bookId: $bookId) {
            _id
            email
            password
        }
    }
`;

// REMOVE BOOK MUTATION
export const REMOVE_BOOK = gql`
    mutation removeBook($userId: ID!, $bookId: ID!) {
        removeBook(userId: $userId, bookId: $bookId) {
            _id
            email
            password
        }
    }
`;





