import React from "react";
import {SearchOutlined} from '@mui/icons-material';
import styled from "styled-components";



const SearchBarContainer = styled.div`
max-width : 550px;
display : flex;
width: 100%;
margin: 40px   auto;
border: 1px solid ${({theme}) =>theme.primary};
border-radius: 8px;
padding: 10px 16px;
cursor: pointer;
gap: 6px;
align-items: center;
`;

  



const SearchBar = ({search,setSearch}) => {   
    return (
       <SearchBarContainer>
        <SearchOutlined/>
        <input placeholder = "Search with prompt or name . . ."
        style ={{
            border:"none",
            outline:"none",
            width:"100%",
            color:"inherit",
            background:"transparent",
            fontSize:"20px",
        }} 
           value ={search}
           onChange={(e) => setSearch(e.target.value)}
        />
       </SearchBarContainer>
       
    )
}   

export default SearchBar;   