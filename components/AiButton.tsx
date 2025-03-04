"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useState } from "react"
import ChatCard from "@/components/ChatCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { aiChat } from "@/lib/action/ai.action"

const AiButton = () => {
  const pathName = usePathname()
  const [query, setQuery] = useState("")
  const [chats, setChats] = useState([
    {
      role: "assistant",
      content: "你好，我是医疗助手，有什么可以帮助您？",
    },
  ])

  if (pathName === "/register" || pathName === "/login") {
    return null
  }

  const handleSubmit = async () => {
    if (!query) return
    const newChats = [...chats, { role: "user", content: query }]
    setChats(newChats)
    setQuery("")

    const response = (await aiChat(newChats)) as any
    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader()
    setChats((prev) => [...prev,  { role: "assistant", content: '' }])

    while (true) {
      const { value, done } = await reader.read()
      if (done) break

      // 处理每个数据块
      const lines = value
        .split("\n")
        .filter((line: string) => line.trim() !== "")
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(5) // 移除 'data: ' 前缀
          if (data === "[DONE]") {
            // 流结束
            break
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta.content
            if (text) {
              setChats(prev => {
                const newChats = [...prev]
                newChats[newChats.length - 1].content += text
                return newChats
              })
            }
          } catch (e) {
            console.error("Failed to parse JSON:", e)
          }
        }
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 按下回车键后的逻辑
      handleSubmit()
    }
  }

  return (
    <Popover>
      <PopoverTrigger className="absolute bottom-[100px] right-[160px] rounded px-3 py-1 flex gap-2 items-center bg-gradient-to-br from-green-600 to-purple-950 shadow-lg">
        <Image
          src="/assets/icons/robot.svg"
          alt="Robot"
          width={30}
          height={30}
          priority
        />
        AI 健康助手
      </PopoverTrigger>
      <PopoverContent className="w-[400px] bg-gray-800 border border-gray-700 right-10">
        <div className="overflow-auto h-[500px] flex flex-col">
          {chats.map(({ role, content }, index) => (
            <ChatCard role={role} content={content} key={index} />
          ))}
        </div>
        <div className="w-full  py-2 flex gap-2 items-center">
          <Input
            value={query}
            className="h-[40px] flex-1"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="outline"
            size="icon"
            className="h-[40px] w-[40px]"
            onClick={handleSubmit}
          >
            <Image
              src="/assets/icons/send.svg"
              alt="send"
              height={24}
              width={24}
            />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default AiButton
