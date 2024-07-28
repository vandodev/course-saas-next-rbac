import { getInvite } from '@/http/get-invite'

interface InvitePageProps {
    params: {
      id: string
    }
  }

export default async function InvitePage({ params }: InvitePageProps) {
    const inviteId = params.id
    const { invite } = await getInvite(inviteId)
    return <pre>{JSON.stringify(invite,null,2)}</pre>
}
