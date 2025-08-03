/**
 * WebGL Detection and Utilities
 */

export function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!context;
  } catch {
    return false;
  }
}

export function getDeviceCapabilities() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  
  if (!gl) {
    return {
      isLowEndDevice: true,
      maxTextureSize: 512,
      hasWebGL: false
    };
  }

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const renderer = gl.getParameter(gl.RENDERER);
  
  // Simple heuristic for low-end device detection
  const isLowEndDevice = 
    maxTextureSize < 2048 || 
    /SwiftShader|llvmpipe|software/i.test(renderer) ||
    navigator.hardwareConcurrency < 4;

  return {
    isLowEndDevice,
    maxTextureSize,
    hasWebGL: true,
    renderer
  };
}

export function optimizeForDevice() {
  const capabilities = getDeviceCapabilities();
  
  return {
    enableShadows: !capabilities.isLowEndDevice,
    antialias: !capabilities.isLowEndDevice,
    pixelRatio: capabilities.isLowEndDevice ? 1 : Math.min(window.devicePixelRatio, 2),
    maxParticles: capabilities.isLowEndDevice ? 50 : 200,
    lodLevels: capabilities.isLowEndDevice ? 2 : 4
  };
}