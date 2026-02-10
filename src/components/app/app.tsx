import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getAll } from '../../services/ingredients/actions';
import { selectError, selectIsLoading } from '../../services/user/slice';
import { checkUserAuth } from '../../services/user/actions';
import {
  selectCurrentNumber,
  selectIsLoadingOrder
} from '../../services/order/slice';
import { getFeeds, getOrders } from '../../services/order/actions';
import { Protected } from '../protected-route/protected-route';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const nameT = useSelector(selectCurrentNumber);
  const isUserLoading = useSelector(selectIsLoading);
  const isOrderLoading = useSelector(selectIsLoadingOrder);

  const isLoading = isUserLoading || isOrderLoading;

  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(getAll());
    dispatch(getFeeds());
    dispatch(checkUserAuth());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />

      {isLoading ? (
        <Preloader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Routes location={background || location}>
            <Route
              path='/'
              element={<Protected component={<ConstructorPage />} />}
            />
            <Route
              path='/ingredients/:id'
              element={<Protected component={<IngredientDetails />} />}
            />
            <Route path='/feed' element={<Protected component={<Feed />} />} />
            <Route
              path='/login'
              element={<Protected onlyUnAuth component={<Login />} />}
            />
            <Route
              path='/register'
              element={<Protected onlyUnAuth component={<Register />} />}
            />
            <Route
              path='/forgot-password'
              element={<Protected onlyUnAuth component={<ForgotPassword />} />}
            />
            <Route
              path='/reset-password'
              element={<Protected onlyUnAuth component={<ResetPassword />} />}
            />
            <Route
              path='/profile'
              element={<Protected requireAuth component={<Profile />} />}
            />
            <Route
              path='/profile/orders'
              element={<Protected requireAuth component={<ProfileOrders />} />}
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
          {background && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Protected
                    component={
                      <Modal
                        title='Детали Ингредиента'
                        onClose={() => navigate(-1)}
                      >
                        <IngredientDetails />
                      </Modal>
                    }
                  />
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <Protected
                    requireAuth
                    component={
                      <Modal title={`#${nameT}`} onClose={() => navigate(-1)}>
                        <OrderInfo />
                      </Modal>
                    }
                  />
                }
              />
              <Route
                path='/feed/:number'
                element={
                  <Protected
                    component={
                      <Modal title={`#${nameT}`} onClose={() => navigate(-1)}>
                        <OrderInfo />
                      </Modal>
                    }
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
