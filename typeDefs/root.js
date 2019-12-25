const { gql } = require('apollo-server-express');

const root = gql`
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }

    type Subscription {
        _: String
    }
`;

module.exports = root;