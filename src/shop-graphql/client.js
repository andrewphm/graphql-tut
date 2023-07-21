export class GraphQLClient {
  constructor(uri) {
    this.uri = uri;
  }

  async query(query, variables) {
    try {
      const url = new URL(this.uri);
      url.searchParams.set('query', query);
      url.searchParams.set('variables', JSON.stringify(variables));
      const response = await fetch(url);
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
