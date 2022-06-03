import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useStoreContext } from '../../utils/GlobalState'
import { UPDATE_CATEGORIES } from '../../utils/actions'
import { QUERY_CATEGORIES } from '../../utils/queries'
import { idbPromise } from '../../utils/helpers'
import Dropdown  from '../Dropdown/Dropdown'

function CategoryMenu() {
    const [state, dispatch] = useStoreContext()

    const [ queryCategories ] = useLazyQuery(QUERY_CATEGORIES)

    console.log(dispatch)

    useEffect(() => {
        const getCategoryData = async() => {
            const { data } = await queryCategories()
            console.log(data)

            data.categories.forEach((category) => {
                idbPromise('categories', 'put', category)
            })

            if (data.categories) {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: data.categories
                })
            }
        }
        getCategoryData()
    }, [dispatch])

    return (
        <div id='categories'>
            <Dropdown />
        </div>
    )
}

export default CategoryMenu