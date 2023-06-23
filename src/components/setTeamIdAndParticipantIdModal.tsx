import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { api } from "~/utils/api";

const InitializeSoundModal: React.FC = () => {
    const { data: sessionData, status } = useSession();
    const { mutate: setUserToTeam } = api.user.setUserToTeam.useMutation();
    const { mutate: setParticipantIdToUser } = api.user.setParticipantIdToUser.useMutation();

    const [showModal, setShowModal] = useState(false);
    const [teamId, setTeamId] = useState('');
    const [participantId, setParticipantId] = useState('');

    function sendTeamIdAndParticipantId() {
        const userId = sessionData?.user?.id;
        if (!userId) throw new Error("No user id found");
        setUserToTeam({ teamId: parseInt(teamId), userId });
        setParticipantIdToUser({ participantId: participantId, userId })
        setShowModal(false);
    }

    useEffect(() => {
        if(sessionData?.user === undefined) {
            setShowModal(false);
            return;
        }

        if (sessionData?.user.participantId && sessionData?.user.id_Team) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }, [sessionData?.user]);

    return (
      <>
        {showModal ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="relative mx-auto my-6 w-auto max-w-3xl border-4 border-accent-foreground rounded-lg">
                {/*content*/}
                <div className="relative flex w-full flex-col rounded-lg border-0 bg-background shadow-lg outline-none focus:outline-none ">
                  {/*header*/}
                  <div className="flex items-start justify-between rounded-t border-b border-solid border-primary-foreground p-5">
                    <Label className="text-3xl font-semibold ">
                      Vul hier uw gegeven team ID en participant ID in
                    </Label>
                  </div>
                  <div className="relative flex flex-col justify-center gap-4 p-6">
                    <Label>Team Id</Label>
                    <Input
                      type="number"
                      placeholder="Team ID"
                      value={teamId}
                      onChange={(e) => setTeamId(e.target.value)}
                    />
                    <Label>Participant Id</Label>
                    <Input
                      type="number"
                      placeholder="Participant ID"
                      value={participantId}
                      onChange={(e) => setParticipantId(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-center rounded-b border-t border-solid border-primary-foreground p-6">
                    <Button
                      className={cn(buttonVariants({ size: 'lg' }))}
                      type="button"
                      onClick={sendTeamIdAndParticipantId}
                    >
                      Vul in
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-50 backdrop-blur-3xl"></div>
          </>
        ) : null}
      </>
    )
};

export default InitializeSoundModal;
