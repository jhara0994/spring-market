import React from 'react'
import ArtItem from './ArtItem'
import { useStoreContext } from '../../utils/GlobalState'
import { QUERY_ARTS } from '../../utils/queries'
import { useQuery } from '@apollo/client'

function ArtList() {
    const [state, dispatch] = useStoreContext()
    const { currentCategory } = state
    const { data, loading, error } = useQuery(QUERY_ARTS)

    console.log(data)

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
                Error - No Art products have been listed for sale!
            </div>
        )
    }

    function filterArts() {
        console.log(data.artForSale)
        console.log(data.artForSale[0].title)
        console.log(data.artForSale[0].category)
        if(!currentCategory) {
            return data.artForSale
        }

        return data.artForSale.filter(
            (art) => art.category._id === currentCategory
        )
    }

    const filteredArts = filterArts()
    console.log(filteredArts)

    return (
        <div>
            <h2>ArtWorks for Sale</h2>
            <h3>{(filteredArts.length && currentCategory) ? `Category: ${filteredArts[0].category.name}` :  "" }</h3>
            {data.arts.length ? (
                <div>
                    {filterArts().map((arts) => (
                        <ArtItem
                            key={arts._id}
                            _id={arts._id}
                            image={arts.image}
                            title={arts.title}
                            description={arts.description}
                            price={arts.price}
                            category={arts.category}
                        />
                    ))}
                </div>
            ) : (
                <h4>No art is currently listed for sale!</h4>
            )}
        </div>
    )
}

export default ArtList