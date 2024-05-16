import React from 'react';

function Login() {
  return (
    <section>
      <div className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-xl bg-[#f2f2f7] px-5 py-12 text-center md:px-10">
          <h2 className="text-3xl font-bold md:text-5xl">Login to Your Account</h2>
          <p className="mx-auto mb-5 mt-4 max-w-xl text-[#647084] md:mb-8">
            Welcome back! Please enter your details to sign in.
          </p>
          <form className="mx-auto mb-4 max-w-sm pb-4" name="wf-form-login" method="post">
            <div className="relative mb-4">
              <input type="email" className="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" maxLength="256" name="email" placeholder="Email Address" required="" />
            </div>
            <div className="relative mb-4">
              <input type="password" className="block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" placeholder="Password" required="" />
            </div>
            <button type="submit" className="flex max-w-full justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white shadow-lg">
              <p className="font-bold">Login</p>
            </button>
          </form>
          <p className="text-sm text-[#636262]">
            Don't have an account? 
            <a href="#" className="font-[Montserrat,_sans-serif] text-sm font-bold text-black">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;