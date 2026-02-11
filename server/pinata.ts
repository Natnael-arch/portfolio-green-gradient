import axios from "axios";
import FormData from "form-data";

export async function uploadToPinata(fileBuffer: Buffer, fileName: string): Promise<string> {
    const jwt = process.env.PINATA_JWT;
    if (!jwt) {
        throw new Error("PINATA_JWT environment variable is not set");
    }

    const formData = new FormData();
    formData.append("file", fileBuffer, { filename: fileName });

    const metadata = JSON.stringify({
        name: fileName,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: Infinity,
            headers: {
                "Authorization": `Bearer ${jwt}`,
                ...formData.getHeaders(),
            },
        });

        // Gateway URL
        return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    } catch (error) {
        console.error("Error uploading to Pinata:", error);
        throw new Error("Failed to upload image to Pinata");
    }
}
