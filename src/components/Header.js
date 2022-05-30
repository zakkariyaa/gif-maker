import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <HeaderSection>
      <h2>MP4 to GIF Converter</h2>
      <p>
        This is an online free video to gif converter.
        Amongst many others, we support MP4, WEBM and AVI.
        Select your video, click convert and let the tool do its magic!
      </p>
    </HeaderSection>
  )
}


const HeaderSection = styled.section`
  height: 50vh;
  background-color: #373737;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 2.7rem;
  }
  p {
    margin-top: 0;
    font-size: 1.9rem;
    text-align: center;
    width: 60%;
  }
`

export default Header