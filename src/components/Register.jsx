import React from 'react';


function Register() {
  return (
    <section>
      {/* Container */}
      <div className="py-16 md:py-24 lg:py-32">
        {/* Component */}
        <div className="mx-auto max-w-xl bg-[#f2f2f7] px-5 py-12 text-center md:px-10">
          {/* Title */}
          <h2 className="text-3xl font-bold md:text-5xl">Start 14-day free trial</h2>
          <p className="mx-auto mb-5 mt-4 max-w-xl text-[#647084] md:mb-8">
            Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam, purus sit amet luctus magna fringilla urna
          </p>
          {/* Button */}
          <a href="#" className="mx-auto flex max-w-sm justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white shadow-lg">
            {/* Remplacez "googleLogo" par l'URL de votre image si elle est hébergée en ligne */}
            <img src={googleLogo} alt="" className="mr-4" />
            <p className="font-bold">Sign up with Google</p>
          </a>
          {/* Divider */}
          <div className="mx-auto mb-14 mt-14 flex max-w-sm justify-around">
            {/* Remplacez "lineImage" par l'URL de votre image si elle est hébergée en ligne */}
            <img src={lineImage} alt="" className="inline-block" />
            <p className="text-sm text-[#647084]">or sign up with email</p>
            <img src={lineImage} alt="" className="inline-block" />
          </div>
          {/* Form */}
          <form className="mx-auto mb-4 max-w-sm pb-4" name="wf-form-password" method="get">
            <div className="relative">
              {/* Remplacez "envelopeIcon" par l'URL de votre image si elle est hébergée en ligne */}
              <img alt="" src={envelopeIcon} className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
              <input type="email" className="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" maxLength="256" name="name" placeholder="Email Address" required="" />
            </div>
            <div className="relative mb-4 pb-2">
              {/* Remplacez "lockIcon" par l'URL de votre image si elle est hébergée en ligne */}
              <img alt="" src={lockIcon} className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
              <input type="password" className="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" placeholder="Password (min 8 characters)" required="" />
            </div>
            <a href="#" className="flex max-w-full grid-cols-2 flex-row items-center justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white shadow-lg">
              <p className="mr-6 font-bold">Join Flowspark</p>
              <div className="h-4 w-4 flex-none">
                {/* Inline SVG */}
                <svg fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
                  <title>Arrow Right</title>
                  <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                </svg>
              </div>
            </a>
          </form>
          <p className="text-sm text-[#636262]">
            Already have an account? 
            <a href="#" className="font-[Montserrat,_sans-serif] text-sm font-bold text-black">
              Login now
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;