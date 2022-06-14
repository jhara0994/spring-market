import React from 'react'
import CategoryMenu from '../../components/Category/CategoryMenu'
import ArtList from '../../components/Arts/ArtList'
import Cart from '../../components/Cart/Cart'

function Home() {
    return(
       <CategoryMenu />,
       <ArtList />,
       <Cart />
    )
}

export default Home