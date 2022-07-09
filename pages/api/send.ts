// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";
import { S3 } from "aws-sdk";
import formidable from "formidable";
import { createRouter } from "next-connect";
import multer from "multer";
import { createReadStream, readFile } from "fs";
import { extname } from "path";
import { firestore } from "../../lib/api/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  aws.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  });

  const s3 = new aws.S3({
    region: `eu-central-1`,
  });

  //   console.log(req.body);

  const form = new formidable.IncomingForm();

  const formidableData = await new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      if (err) {
        return reject(err);
      }
      resolve({
        fields,
        files,
      });
    });
  });

  const [file] = !Array.isArray(formidableData.files.file)
    ? [formidableData.files.file]
    : formidableData.files.file;

  console.log(formidableData);

  const fileKey = file
    ? file.originalFilename
      ? `${file.newFilename}${extname(file.originalFilename)}`
      : file.newFilename
    : undefined;

  if (file && fileKey) {
    await s3
      .putObject({
        Bucket: `wedding-board`,
        Key: fileKey,
        Body: createReadStream(file.filepath),
      })
      .promise();
  }

  await firestore.collection("messages").add({
    name: formidableData.fields.name,
    createdAt: new Date(),
    file: fileKey ? `https://wedding-board.s3.eu-central-1.amazonaws.com/${fileKey}` : undefined,
  });

  //   try {
  //     s3.getSignedUrl("putObject", s3Params, async (err, data) => {
  //       if (err) {
  //         return res.json({ success: false, error: err });
  //       }
  //       const returnData = {
  //         signedRequest: data,
  //         url: `https://wedding-board.s3.amazonaws.com/file/${fileName}`,
  //       };
  //       //   const imageUrl = await prisma.user.update({
  //       //     where: {
  //       //       email: session.user.email,
  //       //     },
  //       //     data: {
  //       //       business: {
  //       //         update: {
  //       //           businessLogo: returnData.url,
  //       //         },
  //       //       },
  //       //     },
  //       //   });

  //       return res.status(200).json(returnData);
  //     });
  //   } catch (err) {
  //     return res.status(500).json({});
  //   }

  return res.status(200).json({});
}

export const config = {
  api: {
    bodyParser: false,
  },
};
