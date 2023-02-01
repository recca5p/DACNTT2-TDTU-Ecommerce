import { AlertSnackbar } from 'components';
import Footer from 'components/Footer';
import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
	<>
	  <AlertSnackbar />
	  <div className='relative m-4 min-h-[60px]'>
		<Link to="/">
		  <img src="/large-logo.png" alt="logo" className='absolute top-[-60px]'/>
		</Link>
	  </div>
      <div className="mt-[32px] mb-[64px] px-[24px] 2xl:container 2xl:mx-auto">
		<Outlet />
	  </div>
      <Footer />
    </>
  )
}

export default AuthLayout;