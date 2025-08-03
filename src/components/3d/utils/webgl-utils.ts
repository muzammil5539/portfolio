/**
 * WebGL Detection and Utilities
 */

let _webglSupported: boolean | null = null;
let _deviceCapabilities: {
  isLowEndDevice: boolean;
  maxTextureSize: number;
  hasWebGL: boolean;
  renderer?: string;
} | null = null;

export function isWebGLSupported(): boolean {
  if (_webglSupported !== null) {
    return _webglSupported;
  }

  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    _webglSupported = !!context;
    
    // Clean up
    if (context && 'getExtension' in context) {
      const ext = (context as WebGLRenderingContext).getExtension('WEBGL_lose_context');
      if (ext) {
        ext.loseContext();
      }
    }
    
    return _webglSupported;
  } catch {
    _webglSupported = false;
    return false;
  }
}

export function getDeviceCapabilities() {
  if (_deviceCapabilities !== null) {
    return _deviceCapabilities;
  }

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') as WebGLRenderingContext | null;
  
  if (!gl) {
    _deviceCapabilities = {
      isLowEndDevice: true,
      maxTextureSize: 512,
      hasWebGL: false
    };
    return _deviceCapabilities;
  }

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  const renderer = gl.getParameter(gl.RENDERER);
  
  // Clean up
  const ext = gl.getExtension('WEBGL_lose_context');
  if (ext) {
    ext.loseContext();
  }
  
  // Simple heuristic for low-end device detection
  const isLowEndDevice = 
    maxTextureSize < 2048 || 
    /SwiftShader|llvmpipe|software/i.test(renderer) ||
    navigator.hardwareConcurrency < 4;

  _deviceCapabilities = {
    isLowEndDevice,
    maxTextureSize,
    hasWebGL: true,
    renderer
  };

  return _deviceCapabilities;
}

export function optimizeForDevice() {
  const capabilities = getDeviceCapabilities();
  
  return {
    enableShadows: !capabilities.isLowEndDevice,
    antialias: !capabilities.isLowEndDevice,
    pixelRatio: capabilities.isLowEndDevice ? 1 : Math.min(window.devicePixelRatio, 2),
    maxParticles: capabilities.isLowEndDevice ? 25 : 100,
    lodLevels: capabilities.isLowEndDevice ? 2 : 4,
    powerPreference: capabilities.isLowEndDevice ? "low-power" : "high-performance"
  };
}