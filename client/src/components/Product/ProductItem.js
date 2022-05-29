import React from 'react'
import { Link } from 'react-router-dom'
import { useStoreContext } from '../../utils/GlobalState'
import { ADD_TO_CART } from '../../utils/actions'
import { idbPromise } from '../../utils/helpers'
import Auth from '../../utils/auth'

