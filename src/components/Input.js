import React, { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { AiFillFileAdd } from 'react-icons/ai'
import { AiFillFile } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { FaSync } from 'react-icons/fa'

const API_ENDPOINT = process.env.REACT_APP_BACKEND

const Input = () => {
  const [inputEl, setInputEL] = useState('')
  const [gifFiles, setGifFiles] = useState(null)
  const [finished, setFinished] = useState(false)
  const [processing, setProcessing] = useState(false)
  const toastOptions = {
    position: 'bottom-right',
    theme: 'dark',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  }

  const handleInput = (e) => {
    setInputEL(e.target.files[0])
  }

  const handleClose = () => {
    setInputEL('')
    setGifFiles(null)
    setFinished(false)
    setProcessing(false)
  }

  const handleConvert = async (video) => {
    setProcessing(true)
    setGifFiles(null)
    setFinished(false)

    const blobToDataURL = async (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.onabort = () => reject(new Error('Read Aborted'))
        reader.readAsDataURL(blob)
      })
    }

    const payload = new FormData()
    payload.append('video', video)
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: payload
    });

    if (!res.ok) {
      toast.error('Coverting video failed', toastOptions)
    }

    const gifBlob = await res.blob()
    const gif = await blobToDataURL(gifBlob)

    setProcessing(false)
    setFinished(true)
    setGifFiles(gif)
  }

  return (
    <>
      {
        inputEl ?
          <PreveiwSection>
            <div>
              <AiFillFile />
              <p>{inputEl.name}</p>
              < FaSync className='sync' />
              <button onClick={() => handleConvert(inputEl)}>Convert</button>
              {(processing || finished) && <span processing={processing}
                finished={finished}
                style={{
                  background: processing ? '#e5ecbe' : 'green',
                  color: processing ? '#063970' : 'white'
                }}
              >
                {processing ? 'Processing...' : 'Finished!'}</span>
              }
              {gifFiles && <a href={gifFiles} download>Download</a>}
              <IoClose className='close_icon' onClick={handleClose} />
            </div>
          </PreveiwSection>
          :
          <InputSection>
            <AiFillFileAdd className='icon' />
            <label htmlFor="file">Select File</label>
            <input
              style={{ display: 'none' }}
              type="file"
              id="file"
              accept=".mp4, .avi, .webm"
              onChange={handleInput}
            />
          </InputSection>
      }
    </>
  )
}

const InputSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2.8rem;
  border: 1px solid red;
  border-radius: 0.3rem;
  margin: 3rem auto 0;
  width: fit-content;
  background-color: #b53836;
  color: white;
  .icon, label {
    font-size: 2rem;
    cursor: pointer;
  }
`

const PreveiwSection = styled.section`
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.6rem;
    padding: 0.5rem 2rem;
    width: 80%;
    margin: 2rem auto 0;
    box-shadow: 1.5rem 0.5rem 1.5rem 0.5rem rgba(36, 0, 64, 0.2);

    .sync {
      margin-left: auto;
      margin-right: 2rem;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1.8rem;
      border-radius: 0.3rem;
      background-color: #b53836;
      color: white;
      border: 1px solid transparent;
      cursor: pointer;
    }

    span {
      margin-left: 5rem;
      padding: 0.5rem 1rem;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 1.2rem;
    }

    a {
      text-decoration: none;
      margin-left: 2rem;
      padding: 0.8rem 1.6rem;
      text-transform: uppercase;
      font-size: 1.2rem;
      background-color: green;
      color: white;
      border-radius: 0.3rem;
      cursor: pointer;
    }

    .close_icon {
      margin-left: auto;
      font-size: 2.1rem;
      font-weight: bold;
      color: #b53836;
      cursor: pointer;
    }
  }
`

export default Input