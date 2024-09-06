import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute: FC = () => {
  const isAuth = true;
  // const dispatch = useAppDispatch()
  // const navigate = useNavigate()

  // const isAuth = useAppSelector(authSelector)
  // const user = useAppSelector(userSelector)

  // const [isLoading, setLoading] = useState<boolean>(true)

  // useEffect(() => {
  //   if (isAuth) setLoading(false)
  // }, [isAuth])

  // useEffect(() => {
  //   if (!user || (user && !user.uuid)) getUser()
  // }, [user])

  // const getUser = async () => {
  //   try {
  //     await dispatch(getUserThunk()).unwrap()
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     navigate(`/register`)
  //   }
  // }

  return isAuth ? (
    // <SocketProvider>
    // <Private>
    <Outlet />
  ) : (
    // </Private>
    // </SocketProvider>
    <Navigate to="/" />
  );
};
