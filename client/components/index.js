/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as LandingPage} from './landingPage'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleTea} from './singleTea'
export {default as allOrders} from './allOrders'
export {default as singleOrder} from './singleOrder'
export {default as userProfile} from './userProfile'

export {default as AdminPage} from './Admin/adminPage'

export {default as AdminAllTeas} from './Admin/adminAllTeas'
export {default as AdminAddTea} from './Admin/adminAddTea'
export {default as AdminEditTea} from './Admin/adminEditSingleTea'

export {default as AdminAllUsers} from './Admin/adminAllUsers'
export {default as AdminAddUser} from './Admin/adminAddUser'
export {default as AdminEditUser} from './Admin/adminEditSingleUser'

export {default as AdminAllOrders} from './Admin/adminAllOrders'
