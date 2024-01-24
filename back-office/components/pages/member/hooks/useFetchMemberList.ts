import { UserQuery } from 'data/Query/user.query';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'services/redux/hooks';
import { getMemberList } from 'services/redux/users/member';

const useFetchMemberListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: UserQuery = {
      select: {
        id: true,
        address: true,
        email: true,
        firstName: true,
        isActif: true,
        lastName: true,
        phone: true,
        photoUrl: true,
        password: false,
        socketId: true,
        rule: true,
        ruleId: true,
        username: true,
        wallet: true,
      },
    };
    if (
      router.query.search &&
      router.query.status != 'true' &&
      router.query.status != 'false'
    ) {
      const search: any = router.query.search;
      args = {
        ...args,
        where: {
          AND: [
            {
              isMember: true,
            },
            {
              OR: [
                {
                  firstName: { contains: search, mode: 'insensitive' },
                },
                {
                  lastName: { contains: search, mode: 'insensitive' },
                },
                {
                  email: { contains: search, mode: 'insensitive' },
                },
                {
                  phone: { contains: search, mode: 'insensitive' },
                },
                {
                  username: { contains: search, mode: 'insensitive' },
                },
              ],
            },
          ],
        },
      };
    }
    if (
      (router.query.status == 'true' || router.query.status == 'false') &&
      !router.query.search
    ) {
      const status: boolean = router.query.status == 'true' ? true : false;
      args = {
        ...args,
        where: {
          AND: [
            {
              isMember: true,
            },
            {
              isActif: status,
            },
          ],
        },
      };
    }
    if (
      (router.query.status == 'true' || router.query.status == 'false') &&
      router.query.search
    ) {
      const search: any = router.query.search;
      const status: boolean = router.query.status == 'true' ? true : false;
      args = {
        ...args,
        where: {
          AND: [
            {
              isMember: true,
            },
            {
              OR: [
                {
                  firstName: { contains: search, mode: 'insensitive' },
                },
                {
                  lastName: { contains: search, mode: 'insensitive' },
                },
                {
                  email: { contains: search, mode: 'insensitive' },
                },
                {
                  phone: { contains: search, mode: 'insensitive' },
                },
                {
                  username: { contains: search, mode: 'insensitive' },
                },
              ],
            },
            {
              isActif: status,
            },
          ],
        },
      };
    }
    if (
      !router.query.search &&
      router.query.status != 'true' &&
      router.query.status != 'false'
    ) {
      args = {
        ...args,
        where: {
          isMember: true,
        },
      };
    }
    dispatch(getMemberList({ args }));
  };
};

export default useFetchMemberListe;
