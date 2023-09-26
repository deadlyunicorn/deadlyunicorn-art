import Link from "next/link";
import { getBinaryData, uploadToAws } from "./aws/upload";
import { formatDateUTC } from "../lib/formatDate";
import { redirect } from "next/navigation";
import { uploadToMongo } from "./mongodb/upload";

const ImageUploadForm = () =>{

  return (
    <>
      <nav>
        <Link href={'/'}>Homepage</Link>
      </nav>
      <main className="mt-[25vh] w-full">
        
        <form action={uploadImage} className="flex flex-col w-full items-center ">
          <input tabIndex={0} className="peer absolute left-[50%] w-1 opacity-0" accept="image/*" required type="file" name="image" id="image"/>
          <label htmlFor="image" className="underline peer-valid:decoration-green-400 peer-focus:decoration-purple-400  decoration-red-400">Select image</label>
          <input required className="outline-none" placeholder="Title" name="title"/>
          <button className="hover:underline outline-none focus:underline">Send</button>
          
        </form>
      </main>
    </>
  )
}

export default ImageUploadForm;

const uploadImage = async(formData:FormData)=>{
  "use server"
  
  try{
    const image = formData.get('image') as File;
    if (image.size >  5_242_880) throw "Too large";

    const type = image.type.slice(6);
    const title = formData.get('title') as string;
    const filename = `${formatDateUTC(new Date())}/${title.replaceAll(' ','_')}.${type}`;


    const imageData = await getBinaryData(image);

    await uploadToAws(imageData,filename,type)
    .then( result => { if (result.$metadata.httpStatusCode != 200) throw "AWS Failed"})

    await uploadToMongo(title,filename)
    .then( result => { if ( !result.acknowledged ) throw "MongoDB Failed"})

  }
  catch(error){
    redirect(`/admin?error=${error}`)
  }

  redirect('/');

}