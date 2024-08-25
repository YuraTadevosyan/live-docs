'use server'

import { nanoid } from 'nanoid'
import { revalidatePath } from "next/cache"

import { liveblocks } from '@/lib/liveblocks'
import { parseStringify } from "@/lib/utils"

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
  const roomId = nanoid()

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled Document'
    }

    const usersAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    const roomActions = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: []
    })

    revalidatePath('/')

    return parseStringify(roomActions)
  } catch (e) {
    console.error(`Something go wrong with creating a room: ${e}`)
  }
}