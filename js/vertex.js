export const vertexShader = `
varying vec2 vUv;
uniform float uTime;

void main() {
  vUv = uv;

  float time = uTime * 1.0;

  vec3 transformed = position;

  //her må vi inn med en bølgefunksjon for å få smooth waves... beveegelse!
  //transformed.y = sin(position.y + time );
  transformed.x += sin(position.x + time);
  //transformed.z += sin(position.z + time);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}

`;
