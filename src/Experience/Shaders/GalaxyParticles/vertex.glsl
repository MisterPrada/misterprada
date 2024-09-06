attribute vec4 color;

uniform float uTime;
uniform vec2 uResolution;

uniform float uScale;
uniform float uRotateSpeed;

varying vec3 vMvPos;
varying vec3 vPos;
varying vec3 vColor;
varying float vNoise;

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

void main() {
    float time = uTime;

    vec3 pos = position;
    pos.xz = rotate(pos.xz, time * uRotateSpeed);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float scale = 0.5 * uScale + color.w * 0.4 + color.z * 0.5;
    scale += step(0.98, color.w) * 0.5;
    scale += step(0.99, color.w) * 0.5;
    scale = scale * 0.1 * (1000.0 / length(mvPosition.xyz));
    scale *= mix(sin(color.w * 200.0 + time * 7.0) * 0.5 + 0.5, 1.0, 0.9);
    scale = max(6.0, scale);

    float resolutionScale = uResolution.y * 0.001;
    gl_PointSize = scale * resolutionScale;
    gl_Position = projectionMatrix * mvPosition;

    vMvPos = mvPosition.xyz;
    vColor = color.xyz;
    vNoise = color.w;
}
