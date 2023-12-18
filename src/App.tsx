import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Home } from "./pages/Home";
import { MainLayouts } from "./layouts/MainLayouts";
import { Loading } from "./components/Loading";

// useSelector - отвечает за вытаскивание данных из хранилища, похоже на useContext
// useDispatch - делает что то
// :(route) - после : указываем параметр который будет динамичен
// lazy - будет подгружать файл только в том случае если компоненты отрендерится
// tree shakong - устраниние неиспользуемого кода из бандла (например: webpack не будет собирать в бандл неиспользуемый импорт)

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/404'))

function App() {
  return ( 
    <Routes>
      <Route path="/" element={ <MainLayouts /> }>
      <Route path="" element={<Home />} />
      <Route path="cart" element={
        <Suspense fallback={<Loading />}>
          <Cart />
        </Suspense>
      } />
      <Route path="pizza/:id" element={
        <Suspense fallback={<Loading />}>
          <FullPizza />
        </Suspense>
      } />
      <Route path="*" element={
        <Suspense fallback={<Loading />}>
          <NotFound />
        </Suspense>
      } />
    </Route>
    </Routes>
  );
}

export default App;
