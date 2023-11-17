import { FC, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps, shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as auth from './AuthRedux';
import { getAuthenticatedUser } from './AuthCRUD';
import { RootState } from '../../../../setup';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core';


const mapState = (state: RootState) => ({ auth: state.auth });
const connector = connect(mapState, auth.actions);
type PropsFromRedux = ConnectedProps<typeof connector>

const AuthInit: FC<PropsFromRedux> = (props) => {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const token = useSelector<RootState>(({auth}) => auth.token, shallowEqual)

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { data: user } = await getAuthenticatedUser();
          if (user) {
            dispatch(props.fulfillUser(user));
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          dispatch(props.logout())
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (token) {
      requestUser()
    } else {
      dispatch(props.logout())
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>
}

export default connector(AuthInit)
