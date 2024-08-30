import { RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

import Loader from '@/components/Loader'
import Header from '@/components/Header'
import { Editor } from '@/components/editor/Editor'

export default function CollaborativeRoom() {
  return (
    <RoomProvider id="room">
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-roomActions">
          <Header className="sticky left-0 top-0">
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="w-fit flex items-center justify-center gap-2">
                <p className="document-title">
                  Share
                </p>
              </div>

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>

          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}