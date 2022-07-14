// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";
import { firestore } from "../../lib/api/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  aws.config.update({
    region: "us-east-1",
    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.APP_AWS_SECRET,
  });

  const docs = await firestore.collection("messages").get();

  const batch = firestore.batch()

  docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit()

  return res.status(200).json({});
}

export const config = {
  api: {
    bodyParser: false,
  },
};
