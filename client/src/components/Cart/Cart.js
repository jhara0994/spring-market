import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { idbPromise } from '../../utils/helpers'
import Auth from '../../utils/auth'
import { TOGGLE_CART, ADD_TO_CART } from '../../utils/actions'
import { loadStripe } from '@stripe/stripe-js'
import { useLazyQuery } from '@apollo/client'
import { QUERY_CHECKOUT } from '../../utils/queries'
import { useStoreContext } from '../../utils/GlobalState'
import {FaCartArrowDown, FaWindowClose} from 'react-icons/fa'
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

function Cart() {
    const [state, dispatch] = useStoreContext()
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT)

    useEffect(() => {
        if(data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({sessionId: data.checkout.session})
            })
        }
    }, [data])

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise( 'cart', 'get')
            dispatch({ type: ADD_TO_CART, products: [...cart]})
        }

        if(!state.cart.length) {
            getCart()
        }
    }, [state.cart.length, dispatch])

    function toggleCart() {
        dispatch({ type: TOGGLE_CART  })
    }

    function calculateTotal() {
        let sum = 0
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity
        })
        return sum.toFixed(2)
    }

    function submitCheckout() {
        const productIds = []
        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i ++) {
                productIds.push(item._id)
            }
        })
        getCheckout({
            variables: { products: productIds }
        })
    }

    if(!state.cartOpen) {
        return(
            <div onClick={toggleCart}>
                <FaCartArrowDown color='black' size='40px' />
            </div>
        )
    }

    return (
        <div>
            <div>
                <FaWindowClose color='black' size='40px' />
            </div>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div>
                        <span>Total: {calculateTotal()}</span>

                        {Auth.loggedIn() ? (
                            <btn onClick={submitCheckout}>Checkout</btn>
                        ) : (
                            <span>Login first to checkout</span>
                        )}
                    </div>
                </div>
            ) : (
                <h3>
                    <span role='img' aria-label='shocked'>
                        Emoji Goes here
                    </span>
                </h3>
            )}
        </div>
    )
}

export default Cart