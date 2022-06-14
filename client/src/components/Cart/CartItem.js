import React from 'react'
import { useStoreContext } from '../../utils/GlobalState'
import { REMOVE_FROM_CART } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'

function CartItem({item}) {
    const [state, dispatch] = useStoreContext()
    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        })
        idbPromise('cart', 'delete', { ...item })
    }

    const onChange = (e) => {
        const value = e.target.value
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            })
            idbPromise('cart', 'delete', { ...item })
        }
    }

    return (
        <div>
            <div>
                <img
                    src={`/images/${item.image}`}
                    alt=''
                />
            </div>
            <div>
                <div>{item.title}, {item.price}</div>
                <div>
                    <span   
                        role='img'
                        aria-label='trash'
                        onClick={() => removeFromCart(item)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CartItem