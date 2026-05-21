export const theme = {
  colors: {
    bg: '#0a0a0a',
    bgCard: '#0f0f0f',
    bgCardHover: '#141414',
    bgTerminal: '#050505',
    bgInput: '#0d0d0d',

    neon: '#00ff88',
    neonDim: 'rgba(0, 255, 136, 0.5)',
    neonFaint: 'rgba(0, 255, 136, 0.08)',
    border: '#00ff88',
    borderDim: 'rgba(0, 255, 136, 0.2)',

    text: '#e0e0e0',
    textDim: '#666666',
    textNeon: '#00ff88',
    textCode: '#00ff88',

    error: '#ff4455',
    warning: '#ffaa00',
    success: '#00ff88',
  },

  shadows: {
    neonGlow: '0 0 8px rgba(0, 255, 136, 0.6), 0 0 20px rgba(0, 255, 136, 0.3)',
    neonGlowHover: '0 0 12px rgba(0, 255, 136, 0.9), 0 0 30px rgba(0, 255, 136, 0.5), 0 0 50px rgba(0, 255, 136, 0.2)',
    neonGlowText: '0 0 8px rgba(0, 255, 136, 0.8)',
    neonGlowCard: '0 0 20px rgba(0, 255, 136, 0.1)',
    cardHover: '0 0 30px rgba(0, 255, 136, 0.2), inset 0 0 20px rgba(0, 255, 136, 0.03)',
  },

  fonts: {
    body: "'Noto Sans KR', sans-serif",
    mono: "'Space Mono', monospace",
  },

  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.3s ease',
    glow: 'box-shadow 0.3s ease, border-color 0.3s ease',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
};
