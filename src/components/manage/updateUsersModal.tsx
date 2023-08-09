import { User } from '@prisma/client'
import toast from 'react-hot-toast'
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

const userRoles = ['USER', 'ADMIN'] as const

const UpdateUsersModal: React.FC<BaseStaticModalProps> = ({ setmodal, user }) => {
  const ctx = api.useContext()
  const { mutate: updateUserRole } = api.user.updateUserRole.useMutation({
    onSuccess: () => {
      toast.success('Rol is succesvol aangepast')
      ctx.user.getAllUsers.invalidate()
    },
  })

  const { mutate: updateUserIsAllowedToPlay } = api.user.updateUserIsAllowedToPlay.useMutation({
    onSuccess: () => {
      toast.success('De speler mag spelen is aangepast')
      ctx.user.getAllUsers.invalidate()
    },
  })

  function updateUserRoleValues(role: string) {
    updateUserRole({
      id: user.id,
      role: role,
    })
    setmodal(false)
  }

  function updateUserIsAllowedToPlayValues(isAllowedToPlay: string) {
    const value = isAllowedToPlay === 'true'
    updateUserIsAllowedToPlay({
      id: user.id,
      isAllowedToPlay: value,
    })
    setmodal(false)
  }


  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col gap-3 rounded-lg border-0 bg-slate-500 shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid  p-5">
              <h3 className="text-3xl font-semibold">
                Verander rol en mag spelen voor {user.name}
              </h3>
            </div>
            <h3> Kies hieronder de rol</h3>
            <div className="relative flex justify-center px-4">
              <Select
                defaultValue={user.role ?? userRoles[0]}
                onValueChange={(value: string) => updateUserRoleValues(value)}
              >
                <SelectTrigger className="w-[180px] border-2">
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
            <h3> Bepaal hieronder of de speler mag spelen</h3>
            <div className="relative flex justify-center px-4">
              <Select
                defaultValue={user.isAllowedToPlay?.toString() ?? 'false'}
                onValueChange={(value: string) => updateUserRoleValues(value)}
              >
                <SelectTrigger className="w-[180px] border-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Bepaal of speler mag spelen</SelectLabel>
                    <SelectItem value={'true'}>Mag wel spelen</SelectItem>
                    <SelectItem value={'false'}>Mag niet spelen</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center rounded-b border-t border-solid p-6">
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
