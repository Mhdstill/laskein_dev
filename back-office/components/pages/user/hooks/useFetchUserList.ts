import { UserQuery } from 'data/Query/user.query';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'services/redux/hooks';
import { getUtilisateurList } from 'services/redux/users/admin';

const useFetchUserListe = () => {
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
      },
    };
    /**
     * Search true
     * Status true
     * role true
     */
    if (
      router.query.search &&
      (router.query.status == 'true' || router.query.status == 'false') &&
      router.query.role &&
      router.query.role != 'all'
    ) {
      const search: any = router.query.search;
      const status: boolean = router.query.status == 'true' ? true : false;
      const roleId: any = router.query.role;
      args = {
        ...args,
        where: {
          AND: [
            {
              isAdmin: true,
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
            {
              ruleId: {
                equals: roleId,
              },
            },
          ],
        },
      };
    }
    /**
     * Search true
     * Status true
     * role false
     */
    if (
      router.query.search &&
      (router.query.status == 'true' || router.query.status == 'false') &&
      (!router.query.role || router.query.role == 'all')
    ) {
      const search: any = router.query.search;
      const status: boolean = router.query.status == 'true' ? true : false;
      args = {
        ...args,
        where: {
          AND: [
            {
              isAdmin: true,
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
    /**
     * Search true
     * Status false
     * role true
     */
    if (
      router.query.search &&
      router.query.status != 'true' &&
      router.query.status != 'false' &&
      router.query.role &&
      router.query.role != 'all'
    ) {
      const search: any = router.query.search;
      const roleId: any = router.query.role;
      args = {
        ...args,
        where: {
          AND: [
            {
              isAdmin: true,
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
              ruleId: {
                equals: roleId,
              },
            },
          ],
        },
      };
    }
    /**
     * Search false
     * Status true
     * role true
     */
    if (
      !router.query.search &&
      (router.query.status == 'true' || router.query.status == 'false') &&
      router.query.role &&
      router.query.role != 'all'
    ) {
      const status: boolean = router.query.status == 'true' ? true : false;
      const roleId: any = router.query.role;
      args = {
        ...args,
        where: {
          AND: [
            {
              isAdmin: true,
            },
            {
              isActif: status,
            },
            {
              ruleId: {
                equals: roleId,
              },
            },
          ],
        },
      };
    }
    /**
     * Search true
     */
    if (
      router.query.search &&
      router.query.status != 'true' &&
      router.query.status != 'false' &&
      (!router.query.role || router.query.role == 'all')
    ) {
      const search: any = router.query.search;
      args = {
        ...args,
        where: {
          AND: [
            {
              isAdmin: true,
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
    /**
     * status true
     */
    if (
      (router.query.status == 'true' || router.query.status == 'false') &&
      (!router.query.role || router.query.role == 'all') &&
      !router.query.search
    ) {
      const status: boolean = router.query.status == 'true' ? true : false;
      args = {
        ...args,
        where: {
          AND: [
            {
              isAdmin: true,
            },
            {
              isActif: status,
            },
          ],
        },
      };
    }
    /**
     * role true
     */
    if (
      router.query.status != 'true' &&
      router.query.status != 'false' &&
      !router.query.search &&
      router.query.role &&
      router.query.role != 'all'
    ) {
      const roleId: any = router.query.role;
      args = {
        ...args,
        where: {
          AND: [
            {
              isAdmin: true,
            },
            {
              ruleId: {
                equals: roleId,
              },
            },
          ],
        },
      };
    }
    /**
     * all false
     */
    if (
      !router.query.search &&
      router.query.status != 'true' &&
      router.query.status != 'false' &&
      (!router.query.role || router.query.role == 'all')
    ) {
      args = {
        ...args,
        where: {
          isAdmin: true,
        },
      };
    }
    dispatch(getUtilisateurList({ args }));
  };
};

export default useFetchUserListe;
