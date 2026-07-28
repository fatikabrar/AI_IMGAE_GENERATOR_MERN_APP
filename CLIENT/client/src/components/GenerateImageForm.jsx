import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome } from "@mui/icons-material";
import { CreateRounded } from "@mui/icons-material";
import { CreatePosts, GenerateAIImage } from "../api/index";

const Form = styled.div`
  width: auto;
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const GenerateImageForm = ({
  post,
  setPost,
  createPostLoading,
  setGenerateImageLoading,
  generateImageLoading,
  setCreatePostLoading,
}) =>{
    const  navigate = useNavigate();
  const [error, SetError] = useState("");
  
  const generateImageFun = async () => {
    setGenerateImageLoading(true);
    await GenerateAIImage({ prompt: post.prompt })
      .then((res) => {
          setPost({ 
            ...post, 
         photo: res.data.photo
      }); 
      setGenerateImageLoading(false);
    })
     .catch ((error)=> {
      SetError(error?.response?.data?.message);
       setGenerateImageLoading(false);
    });
  };

  const createPostFun = async () => {
    setCreatePostLoading(true);
     await CreatePosts(post)
      .then((res) => { 
      setCreatePostLoading(false);
      navigate("/");
      window.location.reload();
    })
     .catch ((error)=> {
      SetError(error?.response?.data?.message);
       setCreatePostLoading(false);
    });
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with Prompt</Title>
        <Desc>Write your prompt according to the image you want to generate!</Desc>
      </Top>

      <Body>
        <TextInput
          label="Author"
          placeholder="Enter Your Name..."
          name="name"
          value={post?.name || ""}
          handleChange={(e) => setPost({ ...post, name: e.target.value })}
        />

        <TextInput
          label="Image Prompt"
          placeholder="Write a Detailed Prompt About The Image You Want To Generate..."
          name="prompt"
          rows="8"
          textArea
          value={post?.prompt || ""}
          handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
          fullWidth
        />
        {error && <div style ={{color : "red"}}>{error}</div>}
        <p style={{ color: "dodgerblue" }}>
          ** You can post the AI Generated Image to the Community **
        </p>
      </Body>

      <Actions>
        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome/>}
          size="large"
          isLoading={generateImageLoading}
          isDisabled={!post?.prompt?.trim()}          
          onClick={generateImageFun}
        />
        <Button
          text="Post Image"
          leftIcon={<CreateRounded />}
          size="large"
          type="primary"
          isLoading={createPostLoading}
          isDisabled={!post?.name?.trim() || !post?.prompt?.trim() || !post?.photo} 
          onClick={createPostFun}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm