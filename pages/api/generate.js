import QRCodeStyling from 'qr-code-styling';

export default async function handler(req, res) {
    const { url, filename = 'qr-code' } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    const qrCode = new QRCodeStyling({
        width: 3000,
        height: 3000,
        margin: 10,
        type: "png",
        data: url,
        image: "https://oncurehealth.com/qr-gen/logo.svg",
        qrOptions: {
            typeNumber: "0",
            mode: "Byte",
            errorCorrectionLevel: "H"
        },
        imageOptions: {
            hideBackgroundDots: false,
            imageSize: 1,
            margin: 0
        },
        dotsOptions: {
            type: "dots",
            color: "#12697d"
        },
        backgroundOptions: {
            color: "#ffffff"
        },
        cornersSquareOptions: {
            type: "extra-rounded",
            color: "#12697d"
        },
        cornersDotOptions: {
            type: "dot",
            color: "#12697d"
        }
    });

    const canvas = document.createElement('canvas');
    await qrCode.append(canvas);

    // Return the image
    canvas.toBlob((blob) => {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="${filename}.png"`
        );
        res.status(200).send(blob);
    });
}
