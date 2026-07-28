import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/theme';
import Home from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

const Container = styled.div`
display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
 font-weight: bold;
  flex: 1;
  display: flex;
  padding: 0px;
  flex-direction: column;
  
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
        <Container>
            <BrowserRouter>
              <Navbar></Navbar>
                <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<CreatePost />} />
            </Routes>
               </Wrapper>
            </BrowserRouter>
        </Container>
    </ThemeProvider>
  );
}

export default App;
