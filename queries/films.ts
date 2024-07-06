import { graphql } from "gql.tada";

export const Films = graphql(`
  query FilmsQuery {
    allFilms {
      films {
        id
        title
      }
    }
  }
`);
