import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface HeaderProps {
    children: ReactNode
    className: string
}

export default function Header ({ children, className }: HeaderProps) {
  return (
    <div className={cn("header", className)}>
      <Link
        href='/'
        className="flex items-center"
      >
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <span className="text-lg">
             Live Dox
        </span>
      </Link>
      {children}
    </div>
  )
}