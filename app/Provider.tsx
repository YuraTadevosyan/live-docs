'use client'

import { ReactNode } from 'react'
import { LiveblocksProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import { useUser } from '@clerk/nextjs'

import Loader from '@/components/Loader'
import { getClerkUsers } from '@/lib/actions/user.actions'

export default function Provider({ children }: { children: ReactNode }) {
  const { user: clerkUser } = useUser()
    
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds })

        return users
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}