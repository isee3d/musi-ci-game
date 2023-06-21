const ManageBaseModal: React.FC<{ title: string; children?: React.ReactNode }> = ({
  children,
  title,
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative mx-auto my-6 w-1/3 max-w-7xl">
          <div className="relative flex w-full flex-col rounded-lg bg-white p-4 shadow-lg dark:bg-black">
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">{title}</h3>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default ManageBaseModal
