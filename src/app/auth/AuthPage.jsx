"use client";
import AuthForm from "@/src/components/auth/AuthForm";
import Image from "next/image";
import React from "react";

const AuthPage = () => {
  return (
    <section className="lg:overflow-hidden bg-[#FCFAFF] lg:min-h-screen  flex items-center justify-center">
      <div className="container flex flex-row gap-10 items-center justify-center py-15 nest-hub:gap-6 nest-hub-max:gap-8">
        {/* Image div */}
        <div
          className={`hidden relative -translate-y-[-4px] w-full h-[300px] 
                    lg:flex nest-hub:scale-90 nest-hub-max:scale-95 items-center justify-center order-2 `}
        >
          {/* Rounded background */}
          <div
            className={`absolute w-[450px] -translate-y-[-118px]  
                            h-[450px] bg-primary rounded-full z-0 transform duration-500 transition-all
                            nest-hub:w-[380px] nest-hub:h-[380px] nest-hub:-translate-y-[-100px]
                            nest-hub-max:w-[420px] nest-hub-max:h-[420px] xl:-translate-y-[-190px]`}
          ></div>

          {/* Image */}
          <div
            className="relative w-[500px] h-[700px] -translate-y-[-75px]
                                   nest-hub:w-[420px] nest-hub:h-[600px] nest-hub:-translate-y-[-60px]
                                   nest-hub-max:w-[460px] nest-hub-max:h-[650px] xl:-translate-y-[-100px]"
          >
            {/* Login Image */}
            <Image
              alt="Login"
              src="/assets/images/hero-signin.webp"
              fill
              className="object-contain relative z-10 transition-all duration-500 ease-in-out opacity-100 scale-100"
            />
          </div>
        </div>

        {/* Form div */}
        <div
          className="bg-[#ffffff] md:w-[450px] lg:w-full md:mx-auto shadow-[2px_2px_0px_rgba(0,0,0,0.10)] w-full flex items-center justify-center rounded-2xl p-4 order-2 md:order-1
                              lg:p-1 xl:p-4"
        >
          <div className="w-full md:px-5 xl:px-5 lg:px-5">
            {/* Welcome Title */}
            <div
              className="mb-8 transition-all duration-500 ease-in-out
                                      nest-hub:mb-6 nest-hub-max:mb-7"
            >
              <div
                className="flex flex-col justify-center items-center space-y-2
                                             nest-hub:space-y-1 nest-hub-max:space-y-2"
              >
                <h1
                  className="text-4xl font-[500] text-primary transition-all duration-500 ease-out transform translate-y-0 opacity-100
                                                 nest-hub:text-3xl nest-hub-max:text-4xl"
                >
                  WELCOME !
                </h1>
                <p
                  className="text-2xl transition-all duration-300 ease-in-out transform translate-y-0 opacity-100
                                                nest-hub:text-xl nest-hub-max:text-2xl"
                >
                  LOGIN
                </p>
              </div>
            </div>

            <div className="transition-all duration-500  ease-in-out">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
