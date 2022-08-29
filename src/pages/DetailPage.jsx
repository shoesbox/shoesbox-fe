import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
const DetailPage = () => {
const nickName = 'Sunny'
const images = ['./images/h1.jpg','./images/h2.jpg','./images/h3.jpg','./images/h4.jpg','./images/h5.jpg','./images/h6.jpg','./images/h7.jpg','./images/h8.jpg','./images/h9.jpg','./images/h10.jpg']
const contents = 'ㅋㅋㅋㅋㅋㅋ'.repeat(100);


  return (
    <>
    <CssBaseline />
      <Container maxWidth="lg"> 
      <Box><strong>일기주인👉 {nickName}</strong></Box>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((item, idx) => (
          <ImageListItem key={idx}>
            <img
              src={`${item}?w=248&fit=crop&auto=format`}
              srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={idx}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box>
      {contents}
      </Box>
      </Container>
      </>
  )
}

export default DetailPage