import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { liveblocks } from '@/lib/liveblocks'
import { getUserColor } from "@/lib/utils"

export async function POST(request: Request) {
  const userDetails = await currentUser()

  if (!userDetails) {
    redirect('sign-in')
  }

  const { id, firstName, lastName, emailAddresses, imageUrl } = userDetails

  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id)
    }
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: []
    },
    { userInfo: user.info },
  )

  return new Response(body, { status })
}