import React from 'react';


function Home() {
    return (
<section className="relatve">
  {/* Container */}
  <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
    {/* Heading Div */}
    <div className="mx-auto mb-12 w-full max-w-3xl text-center md:mb-16 lg:mb-20">
      <h1 className="mb-4 text-4xl font-semibold md:text-6xl">Welcome on My Social Network. This <span className="bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/6390526ac2a607693620c97b_Rectangle%2010.svg')] bg-cover bg-center px-4 text-white">website</span>is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.</h1>
      
      {/* Button Wrap */}
      <div className="flex justify-center">
        <a href="#" className="mr-5 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px] md:mr-6">Get Started</a>
        <a href="#" className="flex max-w-full flex-row items-center justify-center rounded-xl border border-solid border-[#1353fe] px-6 py-3 font-semibold text-[#1353fe] [box-shadow:rgb(19,_83,_254)_6px_6px]">
          <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905a575ec39b6784fc687c_Play.svg" alt="" className="mr-2 inline-block w-6" />
          <p className="text-black">View Showreel</p>
        </a>
      </div>
    </div>
    {/* Image Div */}
    <div className="relative mx-auto h-[512px]">
      <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63915d247ab06a755ee4aaee_magicpattern-KfFmwa7m5VQ-unsplash.jpg" alt="" className="inline-block h-full w-full rounded-xl object-cover sm:rounded-2xl" />
      <div className="absolute bottom-0 left-4 right-0 top-4 -z-10 h-full w-full rounded-2xl bg-black"></div>
    </div>
  </div>
  {/* BG Images */}
  <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905b9f809b5c8180ce30c5_pattern-1.svg" alt="" className="absolute bottom-0 left-0 right-auto top-auto -z-10 inline-block md:bottom-1/2 md:left-0 md:right-auto md:top-auto" />
  <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905ba1538296b3f50a905e_pattern-2.svg" alt="" className="absolute bottom-auto left-auto right-0 top-0 -z-10 hidden sm:inline-block" />
</section>

);
}

export default Home;