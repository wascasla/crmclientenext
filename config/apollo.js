import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

// tiene la configuracion de a donde nos vamos a contectar para obtener los datos
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

// modificamos el header
const authLink = setContext((_, { headers }) => {

    // Leer el storage almacenado
    const token = localStorage.getItem('token');
    return {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;