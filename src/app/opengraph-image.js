import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'मनोकामना ट्रेडिंग कंपनी';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #052e16 0%, #16a34a 60%, #15803d 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Electric bolt icon box */}
        <div
          style={{
            width: '120px',
            height: '120px',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
          }}
        >
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none">
            <path d="M13 3L4 14h8l-1 7 9-11h-8z" fill="white" />
          </svg>
        </div>

        {/* Business name */}
        <div style={{ fontSize: '72px', fontWeight: 'bold', color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
          मनोकामना ट्रेडिंग कंपनी
        </div>

        {/* Tagline */}
        <div style={{ fontSize: '34px', color: 'rgba(255,255,255,0.85)', marginBottom: '12px' }}>
          Panther E-Rickshaw &amp; E-Scooter | The Battery Shop
        </div>

        {/* Location */}
        <div style={{ fontSize: '26px', color: 'rgba(255,255,255,0.65)' }}>
          शाहाबाद, बृजमनगंज, महाराजगंज, UP • 📞 8299200015
        </div>

        {/* Domain badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '80px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '16px',
            padding: '10px 28px',
            fontSize: '28px',
            color: 'white',
            fontWeight: '600',
          }}
        >
          manakamana.in
        </div>
      </div>
    ),
    { ...size }
  );
}
