import React from 'react'
import { Link } from 'react-router-dom'
import { useStoreContext } from '../../utils/GlobalState'
import { ADD_TO_CART } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'
import css from './art.module.css'
import Auth from '../../utils/auth'

function ArtItem(item) {
    const { image, title, description, _id, price, category } = item
    const [state, dispatch] = useStoreContext()
    const { cart } = state

    const addToCart = () => {
        const cartItem = cart.find((cartItem) => cartItem._id === _id)
        if(!cartItem) {
            dispatch({
                typ: ADD_TO_CART,
                art: { ...item, purchaseQuantity: 1 }
            })
            idbPromise("cart", "put", { ...item, purchaseQuantity: 1 })
        }
    }

    return (
        <div className={css.artCard}>
            <Link to={`/art/${_id}`}>
                <h3>{title}</h3>
                {image && (
                    <img className={css.img} alt={title} src={(image.includes('http') ? image : require(`../../assets/images/${image}`))} />
                )}
                <p>{description}</p>
            </Link>
            <div>
                <div><b>Buy Now: </b>${price}</div>
                {category && <div><b>Category:</b> {category.name}</div>}
            </div>
        </div>
    )
}

export default ArtItem