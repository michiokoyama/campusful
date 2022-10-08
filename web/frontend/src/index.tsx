import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Post } from './pages/articles/post';
import { Login } from './pages/login';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  RecoilRoot,
} from 'recoil';


const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <ApolloProvider client={client}>
  <RecoilRoot>
   <ChakraProvider>
     <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/articles/post" element={<Post />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
     </React.StrictMode>
   </ChakraProvider>
  </RecoilRoot>
 </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
