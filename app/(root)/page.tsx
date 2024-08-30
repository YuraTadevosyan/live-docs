import Image from 'next/image'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import Header from '@/components/Header'
import AddDocumentBtn from '@/components/AddDocumentBtn'

export default async function Home() {
  const clerkUser = await currentUser()
  if(!clerkUser) redirect('/sign-in')
  
  const documents = []

  return (
    <main className="home-container">
      <Header className="sticky-0 top-0 left-0">
        <div className="flex items-center gap-2 lg:gap-4">

          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {documents.length ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
          </div>
          <ul className="document-ul">
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />

          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  )
}
