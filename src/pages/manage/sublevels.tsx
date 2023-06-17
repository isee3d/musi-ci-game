import Head from 'next/head';
import { type NextPage } from 'next';
import { SubLevel } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { api } from '~/utils/api';

const ManageSublevels: NextPage = () => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<SubLevel>({ mode: 'onBlur' });
    const { mutate: addSubLevel } = api.sublevel.createSubLevel.useMutation();
    const { mutate: deleteSubLevel } = api.sublevel.deleteSubLevel.useMutation();
    const subLevelQuery = api.sublevel.getAllSubLevels.useQuery();

  return (
    <>
      <Head>
        <title></title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>

      </main>
    </>
  );
};

export default ManageSublevels;
