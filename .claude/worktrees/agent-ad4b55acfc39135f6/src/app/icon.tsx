import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #0A2463 0%, #0D3A8E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            fontFamily: 'sans-serif',
            lineHeight: 1,
          }}
        >
          JPX
        </span>
        {/* Ponto azul — acento visual */}
        <div
          style={{
            position: 'absolute',
            bottom: 5,
            right: 5,
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#0078D4',
          }}
        />
      </div>
    ),
    { width: 32, height: 32 },
  )
}
