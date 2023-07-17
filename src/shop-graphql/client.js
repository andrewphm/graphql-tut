export class GraphQLClient {
  constructor(uri) {
    this.uri = uri;
  }

  async query(query, variables) {
    try {
      const response = await fetch(this.uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const { data } = await response.json();

      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        error,
        data: null,
      };
    }
  }
}
