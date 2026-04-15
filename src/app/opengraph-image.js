// v5 - full English, no Hindi font issues
import { ImageResponse } from 'next/og';

export const alt = 'Manokamana Trading Company';
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
          fontFamily: 'Arial, Helvetica, sans-serif',
          position: 'relative',
        }}
      >
        {/* Electric bolt icon */}
        <div
          style={{
            width: '110px',
            height: '110px',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <svg width="65" height="65" viewBox="0 0 24 24" fill="none">
            <path d="M13 3L4 14h8l-1 7 9-11h-8z" fill="white" />
          </svg>
        </div>

        {/* Business name - full English */}
        <div style={{ fontSize: '76px', fontWeight: 'bold', color: 'white', lineHeight: 1.1, marginBottom: '18px' }}>
          Manokamana Trading Company
        </div>

        {/* Tagline */}
        <div style={{ fontSize: '36px', color: 'rgba(255,255,255,0.88)', marginBottom: '14px' }}>
          Panther E-Rickshaw &amp; E-Scooter  |  The Battery Shop
        </div>

        {/* Location */}
        <div style={{ fontSize: '26px', color: 'rgba(255,255,255,0.65)' }}>
          Shahabad, Brijmanganj, Maharajganj, UP  •  8299200015
        </div>

        {/* Domain badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '44px',
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
