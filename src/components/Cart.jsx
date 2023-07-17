import React from 'react';

function Cart({ cartData, cartLoading }) {
  const cart = cartData?.cartCreate?.cart;

  return (
    <div className="mt-8 mx-auto p-4 shadow border rounded w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Your Cart</h2>

      {cartLoading && (
        <div class="flex w-full justify-center">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
            disabled=""
          >
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </button>
        </div>
      )}

      {cart ? (
        <>
          <div className="space-y-4">
            {cart.lines?.edges?.map(({ node: line }) => (
              <div key={line.id} className="flex items-center space-x-4">
                <img
                  src={line.merchandise?.image?.url}
                  alt={line.merchandise?.title}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{line.merchandise?.title}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {line.quantity ? line.quantity : 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4 text-right">
            <p>
              Total Amount:{' '}
              <span className="font-bold">
                {cart.cost?.totalAmount?.amount} {cart.cost?.totalAmount?.currencyCode}
              </span>
            </p>
            <p>
              Subtotal Amount:{' '}
              <span className="font-bold">
                {cart.cost?.subtotalAmount?.amount} {cart.cost?.subtotalAmount?.currencyCode}
              </span>
            </p>
          </div>
        </>
      ) : (
        <p className="font-bold text-center py-5">Your cart is empty, start shopping now!</p>
      )}
    </div>
  );
}

export default Cart;
