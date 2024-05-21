import React from 'react';


function Home() {
    return (
<section className="relatve">
  {/* Container */}
  <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-12 lg:py-16">
    {/* Heading Div */}
    <div className="mx-auto mb-12 w-full max-w-3xl text-center md:mb-16 lg:mb-20">
      <h1 className="mb-4 text-4xl font-semibold md:text-4xl">Welcome on My Social Network. This <span className="bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/6390526ac2a607693620c97b_Rectangle%2010.svg')] bg-cover bg-center px-4 text-white">website</span>is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.</h1>
    </div>
      
  </div>
  {/* BG Images */}
  <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905b9f809b5c8180ce30c5_pattern-1.svg" alt="" className="absolute bottom-0 left-0 right-auto top-auto -z-10 inline-block md:bottom-1/2 md:left-0 md:right-auto md:top-auto" />
  <img src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905ba1538296b3f50a905e_pattern-2.svg" alt="" className="absolute bottom-auto left-auto right-0 top-0 -z-10 hidden sm:inline-block" />
</section>

);
}

export default Home;