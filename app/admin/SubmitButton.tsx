'use client'

import { useEffect } from "react";
import { experimental_useFormStatus } from "react-dom"

export const FormStatus = () => {

  const { pending } = experimental_useFormStatus();
  useEffect(()=>{

    if ( !pending ){
      //@ts-ignore
      document.querySelector('form').reset()
    }
  }, [ pending ])

  return (
    <span>
      {pending?"Loading..":"Submit"}
    </span>
  )
}