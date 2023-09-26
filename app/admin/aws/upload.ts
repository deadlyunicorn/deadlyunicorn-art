import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const region = 'eu-central-1';

export const uploadToAws = async (binaryData: Buffer, fileName: string, fileType: string) => {

  return await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: `public/${fileName}`,
    Body: binaryData,
    ContentType: fileType
  }))

}


//-- //-- //--
//-- //-- //--

const client = new S3Client(
  {
    region: region,
    credentials: {
      accessKeyId: String(process.env.accessKeyId),
      secretAccessKey: String(process.env.secretAccessKey)
    }
  }
);

//-- //-- //--
//-- //-- //--


const bucket = "deadlyunicorn-art"


//-- //-- //--
//-- //-- //--

export const getBinaryData = async(image:File) => {

  const imageReader = image.stream().getReader();
  const imageDataU8: number[] = [];
  //u8[]

  while (true){

    const {done,value} = await imageReader.read();
    if (done) break;

    imageDataU8.push(...value);

  }

  //@ts-ignore
  const imageBinary = Buffer.from(imageDataU8,'binary');
  return imageBinary;

}