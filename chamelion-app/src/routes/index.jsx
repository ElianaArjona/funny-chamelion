import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '../components/layouts'
import {Blogs, NoPage, Contact, Home, ItemList} from '../components/pages'
import { Table } from '../components/itemList'


import {Suspense} from 'react'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <NoPage />,
        children: [
            {
                path: '', 
                element: <Home />,
            },
            {
                path: 'contact',
                element: <Suspense fallback={<>Loading</>}> <Contact /></Suspense>
            },
            
            {
                path: 'blogs',
                element: <Suspense fallback={<>Loading</>}><Blogs /></Suspense>,
                children: [
                    {
                        path: ':blogid',
                        element: <Suspense fallback={<>Loading</>}><Blogs /></Suspense>
                    }
                ]
            },
            {
                path: 'table',
                element: <Suspense fallback={<>Loading</>}> <Table /></Suspense>
                // element: <Suspense fallback={<>Loading</>}> <ItemList /></Suspense>
            }
        ]
    }
])

const Router = () => {
    return (
      <RouterProvider router={router} />
    )
  }
export default Router