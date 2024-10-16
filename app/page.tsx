"use client"
import { ChatWindow } from 'kanas-chatbot'
import Image from "next/image"
import { useState } from 'react'
import customerServiceIcon from '../public/customer-service.svg'
import leafIcon from '../public/leaf.svg'

import 'kanas-chatbot/dist/style.css'

// This url is based on your server implementation
const chatUrl = 'http://127.0.0.1:8080/chat'

export default function Home() {
  const [showSmallWindow, setShowSmallWindow] = useState(false)
  const [showLargeWindow, setShowLargeWindow] = useState(false)

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-black">
      <Button
        className='absolute left-40 top-40'
        onClick={() => { setShowSmallWindow(true) }}
      >
        Show Small Size Chat Window
      </Button>
      <Button
        className='absolute left-40 top-80'
        onClick={() => { setShowLargeWindow(true) }}
      >
        Show Large Size Chat Window
      </Button>
      {
        showSmallWindow ? (
          <SmallChatWindow onClose={() => { setShowSmallWindow(false) }} />
        ) : null
      }
      {
        showLargeWindow ? (
          <LargeChatWindow onClose={() => { setShowLargeWindow(false) }} />
        ) : null
      }
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
}

const Button = ({
  className = '',
  children,
  ...props
}: ButtonProps) =>{
  return (
    <button
      className={`p-5 border border-white rounded-full text-white hover:bg-stone-800 active:bg-stone-900 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

interface WindowProps {
  onClose: () => void
}

const SmallChatWindow = ({
  onClose,
}: WindowProps) => {
  const nextLogo = (
    <Image
      src="https://nextjs.org/icons/next.svg"
      alt="Next.js logo"
      width={80}
      height={15}
    />
  )

  return (
    <div className="w-[350px] h-[700px] z-10 text-black">
      <ChatWindow
        url={chatUrl}
        title="Small Size Screen"
        onClose={onClose}
        style={{
          borderRadius: 5,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 16px',
        }}
        topChildren={nextLogo}
      />
    </div>
  )
}

const LargeChatWindow = ({
  onClose,
}: WindowProps) => {
  const topLine = (
    <div className='flex items-center'>
      <Image
        src={leafIcon}
        alt="leaf icon"
        width={20}
        height={20}
      />
      <span className='ml-2'>Have a good day!</span>
    </div>
  )

  const bottomLine = (
    <div className='flex items-center float-right'>
      <Image
        className='invert-[0.5]'
        src={customerServiceIcon}
        alt="customer service icon"
        width={20}
        height={20}
      />
      <span className='ml-3 text-stone-600'>666-6666</span>
    </div>
  )

  return (
    <div className="w-10/12 h-[1200px] max-h-screen z-10 text-black">
      <ChatWindow
        url={chatUrl}
        title="How can I help you with your queries?"
        onClose={onClose}
        style={{
          borderRadius: 20,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 16px',
        }}
        topChildren={topLine}
        bottomChildren={bottomLine}
        themeColor='#224375'
      />
    </div>
  )
}