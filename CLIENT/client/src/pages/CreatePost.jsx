import React, { useState } from 'react';
import styled from 'styled-components';
import GenerateImageForm from '../components/GenerateImageForm';
import GenerateImageCard from '../components/GenerateImageCard';

const Container = styled.div`
  flex :1;
  min-height: 300px;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width:100%;
  height: fit-content;
  max-width: 1850px;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  gap: 8%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading]=useState(false);
    const [createPostLoading, setCreatePostLoading]=useState(false);
  const [post,setPost] = useState({
      name : "",
          prompt: "",
        photo : "",

  });
  return (
    <Container>
      <Wrapper>
        <GenerateImageForm 
           post={post}
           setPost={setPost} 
           createPostLoading={createPostLoading}  
           setGenerateImageLoading={setGenerateImageLoading}
           generateImageLoading={generateImageLoading}
           setCreatePostLoading={setCreatePostLoading}
           />
        <GenerateImageCard  src ={post?.photo}loading ={generateImageLoading}/>
      </Wrapper>
    </Container>
  );
};

export default CreatePost;