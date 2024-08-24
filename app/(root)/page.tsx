import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="home-container">
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
    </main>
  )
}
