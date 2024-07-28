
interface InvitePageProps {
    params: {
      id: string
    }
  }

export default async function InvitePage({ params }: InvitePageProps) {
    const inviteId = params.id
    return <p>{inviteId}</p>
}
//http://localhost:3000/invite/idDoConvite
//http://localhost:3000/invite/b1965c67-ef9f-46d6-bffc-51eecfb56a95