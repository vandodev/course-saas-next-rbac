import { getCurrentOrg } from '@/auth/auth'

import Link from 'next/link'
import { Button } from './ui/button'

export function Tabs() {
  const currentOrg = getCurrentOrg()

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >
        <Link href={`/org/${currentOrg}`}>Projects</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >
         <Link href={`/org/${currentOrg}/members`}>Members</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
        >         
            <Link href={`/org/${currentOrg}/settings`}>
            Settings & Billing
          </Link>        
        </Button>
      </nav>
    </div>
  )
}