import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';



const  Container =styled.div`
      flex :1;
      display:flex;
      gap: 16px;
      flex-direction: column;
      align-items : center;
      justify-content : center;
      padding : 16px;
      border : 2px dashed ${({ theme }) => theme.yellow};
      color : ${({ theme })=> theme.arrow};
      border-radius :20px;
      min-height :400px;
`;

  const Image =styled.div`
    width:100%;
    height:100%;
    min-height :350px;
    object-fit: cover;
    border-radius : 24px;
    background : black ;
   
  `;

const GenerateImageCard = ({src,loading}) => {
    return (
    <Container>
        {loading ? (
         <>
         <CircularProgress style={{color: "inherit",width : "24",height : "24px" }}/>
           Generating Your Image ...
           </>
        ):(
                <>{src ? <Image src ={src}/> :<>Write a prompt to generate image </>}</>
                               
                )}
    </Container>
    );
};

export default GenerateImageCard;