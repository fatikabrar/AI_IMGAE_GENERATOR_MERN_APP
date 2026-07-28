import Replicate from "replicate";
import * as dotenv from "dotenv";

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt,
          go_fast: true,
          aspect_ratio: "1:1",
          output_format: "jpg",
          output_quality: 90,
        },
      }
    );

    const stream = output[0];

    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;

    return res.status(200).json({
      success: true,
      photo: base64Image,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};