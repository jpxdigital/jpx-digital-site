import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: 'linear-gradient(135deg, #0A2463 0%, #0D3A8E 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          position: 'relative',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            fontFamily: 'sans-serif',
            lineHeight: 1,
          }}
        >
          JPX
        </span>
        <span
          style={{
            color: '#0078D4',
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.12em',
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
          }}
        >
          Digital
        </span>
      </div>
    ),
    { width: 180, height: 180 },
  )
}
