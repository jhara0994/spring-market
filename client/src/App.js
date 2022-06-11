import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { StoreProvider } from './utils/GlobalState'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home/Home'
import Art from './pages/Art/Art'
import Contact from './pages/Contact/Contact'
import Footer from './components/Footer/Footer'
import { Nav } from 'react-bootstrap'


const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/art' element={<Art />} /> */}
            <Route path='/contact' element={<Contact />} />
          </Routes>
        </StoreProvider>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
