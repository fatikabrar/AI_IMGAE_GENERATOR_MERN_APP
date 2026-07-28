import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { Delete, DownloadRounded } from "@mui/icons-material"; 
import FileSaver from "file-saver";

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  margin: 5px auto;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.white};
    scale: 1.05;
  }
  &:nth-child(7n+1) {
    grid-column: auto / span 2;
    grid-row: auto / span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-end;
  gap: 4px;                   
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(2px);
  color: ${({ theme }) => theme.white};
  transition: opacity 0.3s ease;
  padding: 12px;               
  border-radius: 6px;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.white};
`;

const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;

// ← NEW: Added these two styled components
const IconContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const IconButton = styled.div`
  width: 38px;
  height: 38px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: rgba(255,0,0,0.8);
    transform: scale(1.1);
  }
`;

const ImageCard = ({ item, onDelete }) => {   
  const handleDownload = () => {
    FileSaver.saveAs(item?.photo, "download.jpg");
  };

  const handleDelete = () => {             
    if (onDelete) onDelete(item._id);
  };

  return (
    <Card>
      <LazyLoadImage
        src={item?.photo}
        effect="blur"
        width="100%"
        height="550px"
        style={{ borderRadius: "12px",objectFit: "cover" }}
        alt={item?.prompt || "AI Image"}
         onError={(e) => {
    e.target.src = "https://picsum.photos/400/300?random=";
         }}
         />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>

        <Author>
          <Avatar style={{ width: "32px", height: "32px" }}>
            {item?.name?.[0]}
          </Avatar>
          {item?.name}
        </Author>

        {/* ← NEW: Icon Container with both buttons */}
        <IconContainer>
          <IconButton onClick={handleDownload} title="Download">
            <DownloadRounded />
          </IconButton>

          {onDelete && (                       
            <IconButton onClick={handleDelete} title="Delete Post">
              <Delete />
            </IconButton>
          )}
        </IconContainer>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;