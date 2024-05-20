import { ImageResponse }  from 'next/og';

export const size = {
    width: 32,
    height: 32,
}

export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 20,
                    background: '#3b82f6',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    borderRadius: '50%',
                    borderWidth: 1,
                    borderColor: '#ffffff',
                }}
            >
                H
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}