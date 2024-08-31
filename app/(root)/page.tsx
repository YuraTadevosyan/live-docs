import Image from 'next/image'
import Link from 'next/link'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { dateConverter } from '@/lib/utils'
import Header from '@/components/Header'
import AddDocumentBtn from '@/components/AddDocumentBtn'
import { getDocuments } from '@/lib/actions/room.actions'

export default async function Home() {
  const user = await currentUser()
  if(!user) redirect('/sign-in')
  
  const documents = await getDocuments(user.emailAddresses[0].emailAddress)
  console.log(documents.length)

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

      {documents.data.length ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>

            <AddDocumentBtn
              userId={user.id}
              email={user.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {documents.data.map(({ id, metadata, createdAt }: any) => (
              <li
                key={id}
                className="document-list-item"
              >
                <Link
                  href={`/documents/${id}`}
                  className="flex flex-1 items-center gap-4"
                >
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image
                      src="/assets/icons/doc.svg"
                      alt="file"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                  </div>
                </Link>
                {/*<DeleteModal roomId={id} />*/}
              </li>
            ))}
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
            userId={user.id}
            email={user.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  )
}
