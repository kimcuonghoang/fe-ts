// import { decrement, increment } from "./features/counter/counterSlice";
// import { useAppDispatch, useTypedSelector } from "./store";

// function App() {
//   const count = useTypedSelector((state) => state.counter.count);
//   const dispatch = useAppDispatch();
//   return (
//     <>
//       {/* <AppRoutes /> */}
//       <button onClick={() => dispatch(increment())}>Tang</button>
//       {count}
//       <button onClick={() => dispatch(decrement())}>Giam</button>
//     </>
//   );
// }

// export default App;

// App.js
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addToCart } from "./features/counter/cartSlice";
import store, { RootState } from "./store";

function CartButton() {
  const dispatch = useDispatch();
  console.log(dispatch);
  return (
    <button
      onClick={() =>
        dispatch(
          addToCart({ id: 1, name: "Áo thun", price: 100000, quantity: 1 })
        )
      }
    >
      Thêm áo thun
    </button>
  );
}
function CartInfo() {
  const cart = useSelector((state: RootState) => state.cart);
  return <h1>Giỏ hàng ({cart.length})</h1>;
}

export default function App() {
  return (
    <Provider store={store}>
      <CartInfo />
      <CartButton />
    </Provider>
  );
}
