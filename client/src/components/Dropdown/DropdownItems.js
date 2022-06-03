import React from 'react'
import { useStoreContext } from '../../utils/GlobalState'
import { UPDATE_CURRENT_CATEGORY } from '../../utils/actions'
import { mergeOptions } from '@apollo/client'
import { motion } from 'framer-motion'

function DropdownItems(props) {
    const [state, dispatch] = useStoreContext()

    const { categories } = state

    const handleClick = (id) => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id
        })
        props.closeMenu()
    }

    const from = {opacity: 0, y: 50}
    const to = {opacity: 1, y: 0}

    return (
        <div>
            <h2>Categories: </h2>
            <div>
                {categories.map((category, index) => {
                    return (
                        <div key={category._id}>
                            <motion.li
                                initial = {from}
                                animate = {to}
                                transition = {{delay: ((index+1)*.1)}}
                            >
                            <button
                                onClick={() => {
                                    handleClick(category._id)
                                }}
                            >
                                {category.name}
                            </button>
                            </motion.li>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DropdownItems