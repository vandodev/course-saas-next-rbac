import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ShutdownOrganizationButton() {
  return (
    <form>
      <Button type="submit" variant="destructive" className="w-56">
        <XCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}