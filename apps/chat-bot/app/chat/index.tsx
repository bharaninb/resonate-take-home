import { SmileOutlined, UserOutlined } from '@ant-design/icons'
import { Bubble, Sender, useXAgent, useXChat } from '@ant-design/x'
import { Empty, Flex, GetProp, Result } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: 600,
    },
  },
  local: {
    placement: 'end',
    avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
  },
}

const Chat = () => {
  const [content, setContent] = useState('')

  // We will move this static to the library so that it can be used in server side as well
  const [chatId, setChatId] = useState('NEW_CHAT_ID')

  useEffect(() => {
    localStorage.setItem('chatId', chatId)
  }, [chatId])


  // Agent for request
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onError }) => {
      
      try {
        const response = await axios.post(`chat/${localStorage.getItem('chatId')}`, {
          message
        });
        setChatId(response.data.chatId)
        onSuccess(response.data.message)
      } catch (error) {
        onError(new Error('Oops! Something went wrong on our end. Could you try that again in a few minutes?'))
      }
    },
  })

  // Chat messages
  const { onRequest, messages } = useXChat({
    agent,
    requestPlaceholder: 'Waiting...',
    requestFallback: 'Mock failed return. Please try again later.',
  })

  return (
    <Flex vertical gap="middle">
      {messages.length === 0 ? (
        <Result
        style={{ height: 300 }}
        icon={<SmileOutlined />}
        subTitle="Welcome! 😊 I can help you schedule visits, check timings, or answer quick questions!"
      />
        ) : <Bubble.List
        roles={roles}
        style={{ height: 300 }}
        items={messages.map(({ id, message, status }) => ({
          key: id,
          loading: status === 'loading',
          role: status === 'local' ? 'local' : 'ai',
          content: message,
        }))}
      />}
      
      <Sender
        loading={agent.isRequesting()}
        placeholder='Type your message here...'
        value={content}
        onChange={setContent}
        onSubmit={(nextContent) => {
          onRequest(nextContent)
          setContent('')
        }}
      />
    </Flex>
  )
}

export { Chat }
