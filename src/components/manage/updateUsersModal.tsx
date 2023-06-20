import { User } from '@prisma/client'
import { Button, buttonVariants } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { cn } from '~/lib/utils'
import { api } from '~/utils/api'

interface BaseStaticModalProps {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>
  user: User
}

const userRoles = ['USER', 'ADMIN']

const UpdateUsersModal: React.FC<BaseStaticModalProps> = ({ setmodal, user }) => {
  const ctx = api.useContext()
  const { mutate: updateUserRole } = api.user.updateUserRole.useMutation({
    onSuccess: () => {
      ctx.user.getAllUsers.invalidate()
    },
  })

  function updateUserValues(role: string) {
    updateUserRole({
      id: user.id,
      role: role,
    })
    setmodal(false)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Vul de nieuwe rol in voor {user.name}</h3>
            </div>
            <div className="relative flex justify-center p-6">
              <Select
                defaultValue={user.role ?? userRoles[0]}
                onValueChange={(value: string) => updateUserValues(value)}
              >
                <SelectTrigger className="w-[180px] border-2 border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kies nieuwe rol</SelectLabel>
                    {userRoles.map((role, index) => (
                      <SelectItem value={role}>{role}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center rounded-b border-t border-solid border-slate-200 p-6">
              <Button
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'px-4')}
                type="button"
                onClick={() => setmodal(false)}
              >
                Sluiten
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default UpdateUsersModal
