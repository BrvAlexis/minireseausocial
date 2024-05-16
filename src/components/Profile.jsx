import React from 'react';

function Profile(){
    return(

        
            <section>
              {/* Container */}
              <div className="py-16 md:py-24 lg:py-32">
                {/* Component */}
                <div className="mx-auto max-w-xl bg-[#f2f2f7] px-5 py-12 text-center md:px-10">
                  {/* Title */}
                  <h2 className="text-3xl font-bold md:text-5xl">Votre Profil</h2>
                  <p className="mx-auto mb-5 mt-4 max-w-xl text-[#647084] md:mb-8">
                    Gérez vos informations personnelles et vos paramètres de compte
                  </p>
                  {/* User Info */}
                  <div className="mx-auto mb-14 mt-14 flex max-w-sm flex-col items-center justify-center">
                    {/* Remplacez "profilePic" par l'URL de votre image si elle est hébergée en ligne */}
                    
                    <h3 className="text-lg font-bold">Nom d'Utilisateur</h3>
                    <p className="text-sm text-[#647084]">nom@exemple.com</p>
                  </div>
                  {/* Form */}
                  <form className="mx-auto mb-4 max-w-sm pb-4" name="wf-form-user-profile" method="post">
                    <div className="relative mb-4">
                      <input type="text" className="mb-4 block w-full border border-black bg-white px-3 py-6 text-sm text-[#333333]" placeholder="Nom Complet" required="" />
                    </div>
                    <div className="relative mb-4">
                      <input type="text" className="mb-4 block w-full border border-black bg-white px-3 py-6 text-sm text-[#333333]" placeholder="Numéro de téléphone" required="" />
                    </div>
                    <a href="#" className="flex max-w-full justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white shadow-lg">
                      <p className="font-bold">Mettre à jour le profil</p>
                    </a>
                  </form>
                  <p className="text-sm text-[#636262]">
                    Besoin d'aide? 
                    <a href="#" className="font-[Montserrat,_sans-serif] text-sm font-bold text-black">
                      Contactez le support
                    </a>
                  </p>
                </div>
              </div>
            </section>
          );
        }
        

export default Profile;