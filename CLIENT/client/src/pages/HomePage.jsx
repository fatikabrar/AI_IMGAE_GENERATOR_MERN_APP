import React, { useState, useEffect } from "react"; 
import styled from 'styled-components';
import Searchbar from '../components/SearchBar';
import ImageCard from "../components/ImageCard";
import { CircularProgress } from '@mui/material';
import { GetPosts, DeletePost } from "../api";




const Container = styled.div`
height : 100%;
overflow-y:  scroll;
background : ${({theme }) => theme.bg};
padding : 30px 30px ;
padding-bottom : 50px;
diplay : flex;
flex-direction : column;
align-item : center;
gap : 20px;
@media (max-width : 768px){
padding :6px 10px;
}

`;
const Headline = styled.h1`
font-size : 34px;
color : ${({theme}) => theme.text_primary};
display : flex;
justify-content: center;
flex-direction : column;
text-align : center;
 
@media (max-width : 600px){
font-size : 22px;
}
`;
 const Span = styled.span`
 font-size : 30px;
 color : ${({theme}) => theme.text_secondary};
  
 @media (max-width: 600px){
   font-size :20px;
 }
 `;

const Wrapper = styled.div`
width:100;
max-width:1850px;
padding : 20px 0px;
display :flex;
justify-content :center;
`;

const CardWrapper =styled.div` 
   display: grid;
   gap:20px;
  
   @media (min-width:1850px){
   grid-template-columns: repeat(4,1fr);
   }

   @media (min-width:640px)and (max-width:1849px){
   grid-template-columns: repeat(3,1fr);
   }
   
   @media (max-width:1850px){
   grid-template-columns: repeat(2,1fr);
   }
   `;


const Home = () => {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
   const [error,setError] = useState("");
    const [search,setSearch] = useState("");
     const [filteredPosts,setFilteredPosts] = useState([]);
   // eslint-disable-next-line no-unused-vars
const [refresh, setRefresh] = useState(false);

   const getPosts = async () => {
  setLoading(true);
  try {
    const res = await GetPosts();
    const allPosts = res?.data?.data || [];
    
    setPosts(allPosts);
    setFilteredPosts(allPosts);
  } catch (error) {
    setError(error?.response?.data?.message || "Failed to load posts");
  } finally {
    setLoading(false);
  }
};

     const deletePost = async (id) => {
  if (!window.confirm("Are you sure you want to delete this post permanently?")) return;

  try {
    await DeletePost(id);
    setPosts(posts.filter((p) => p._id !== id));
    setFilteredPosts(filteredPosts.filter((p) => p._id !== id));
    alert("Post deleted successfully!");
  } catch (error) {
    alert("Failed to delete post");
    console.error(error);
  }
};

  useEffect(() => {
  getPosts();
}, [refresh]);
     

     //search posts
        useEffect(()=>{
         if(!search){
           setFilteredPosts(posts);
         }
         const  SearchFilteredPosts = posts.filter((post)=> {
        const promptMatch = post?.prompt?.toLowerCase().includes(search.toString().toLowerCase());
         const authorMatch = post?.name?.toLowerCase().includes(search.toString().toLowerCase());
         
          return promptMatch || authorMatch;
        });
          if(search)
          {
            setFilteredPosts(SearchFilteredPosts)
          }
     },[posts,search]);



 
  return(
  <Container>
   <Headline> Explore popular posts in the Community!
       <Span> Generated with AI </Span>
   </Headline>
   <Searchbar search ={search} setSearch={setSearch}/>
    < Wrapper> 
       {error && <div style ={{color: "red"}}>{error}</div>}
       {loading ? (
       <CircularProgress/> 
       ):(
      <CardWrapper>
          {filteredPosts.length === 0 ? (
             <>No Posts Found</>
                ) : (
                  <>
         {filteredPosts
        .slice()
        .reverse()
        .map((item, index) => (
          <ImageCard 
            key={item._id}
            item={item} 
            onDelete={deletePost}
            />
        ))}
          </>
  )}
</CardWrapper>  
  )}
     </Wrapper>
  </Container>
  )
};
export default Home;