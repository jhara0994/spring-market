import React from 'react'
import ArtItem from './ArtItem'
import { useStoreContext } from '../../utils/GlobalState'
import { QUERY_ARTS } from '../../utils/queries'
import { useQuery } from '@apollo/client'

function ArtList() {
    const [state, dispatch] = useStoreContext()
    const { currentCategory } = state
    const { data, loading, error } = useQuery(QUERY_ARTS)

    if(loading) {
        return (
            <div>
                Loading
            </div>
        )
    }

    if(error) {
        return (
            <div>
                Error
            </div>
        )
    }

    function filterArts() {
        if(!currentCategory) {
            return data.arts
        }

        return data.arts.filter(
            (art) => art.category._id === currentCategory
        )
    }

    const filteredArts = filterArts()

    return (
        <div>
            <h2>ArtWorks for Sale</h2>
        </div>
    )
}

export default ArtList