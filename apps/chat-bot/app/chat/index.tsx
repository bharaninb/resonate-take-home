import { UserOutlined } from '@ant-design/icons'
import { Bubble, Sender, useXAgent, useXChat } from '@ant-design/x'
import { Flex, GetProp } from 'antd'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

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
      
      const response = await axios.post(`chat/${localStorage.getItem('chatId')}`, {
        message
      });
      setChatId(response.data.chatId)
      onSuccess(response.data.message)


      // onError(new Error('Mock request failed'))
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
      <Bubble.List
        roles={roles}
        style={{ height: 300 }}
        items={messages.map(({ id, message, status }) => ({
          key: id,
          loading: status === 'loading',
          role: status === 'local' ? 'local' : 'ai',
          content: message,
        }))}
      />
      <Sender
        loading={agent.isRequesting()}
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
