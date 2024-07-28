import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { auth, isAuthenticated } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getInvite } from '@/http/get-invite'
import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { CheckCircle, LogIn } from 'lucide-react'
import { acceptInvite } from '@/http/accept-invite'

dayjs.extend(relativeTime)

interface InvitePageProps {
  params: {
    id: string
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const inviteId = params.id
  const isUserAuthenticated = isAuthenticated()
  let currentUserEmail = null

  if (isUserAuthenticated) {
    const { user } = await auth()

    currentUserEmail = user.email
  }

  const { invite } = await getInvite(inviteId)

  const userIsAuthenticatedWithSameEmailFromInvite =
  currentUserEmail === invite.email

  async function signInFromInvite() {
    'use server'
    cookies().set('inviteId', inviteId)
    redirect(`/auth/sign-in?email=${invite.email}`)
  }

  async function acceptInviteAction() {
    'use server'

    await acceptInvite(inviteId)

    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>

          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="font-medium text-foreground">
              {invite.organization.name}
            </span>
            .{' '}
            <span className="text-xs">{dayjs(invite.createdAt).fromNow()}</span>
          </p>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInvite}>
            <Button type="submit" variant="secondary" className="w-full">
              <LogIn className="mr-2 size-4" />
              Sign in to accept the invite
            </Button>
          </form>
        )}

        {userIsAuthenticatedWithSameEmailFromInvite && (
          <form action={acceptInviteAction}>
            <Button type="submit" variant="secondary" className="w-full">
              <CheckCircle className="mr-2 size-4" />
              Join {invite.organization.name}
            </Button>
          </form>
        )}

      </div>
    </div>
  )
}