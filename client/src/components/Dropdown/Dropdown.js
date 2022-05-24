import React, { useState } from 'react'
import DropdownItems from './DropdownItems'
import {FaWindowClose} from 'react-icons/fa';
import {RiMenu5Fill} from 'react-icons/ri';

function Dropdown() {
    const [expanded, setExpanded] = useState(false)
    const closeMenu = () => setExpanded(false)

    return (
        <div>
            {!expanded && <RiMenu5Fill  color='black' size='40px'
            onClick={()=>setExpanded(!expanded)} />}
            {expanded && <FaWindowClose color='black' size='40px'
            onClick={()=>setExpanded(!expanded)} />}
            {expanded && <DropdownItems closeMenu={closeMenu}/>}
        </div>
    )
}

export default Dropdown