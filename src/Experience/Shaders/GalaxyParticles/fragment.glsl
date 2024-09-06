uniform float uAlpha;

varying vec3 vColor;
varying float vNoise;


void main() {
    vec2 uv = gl_PointCoord.xy;

    float a = 1.0 - length(uv - 0.5);
    if (a < 0.5) discard;
    a = pow(a, 8.0 + vNoise * 2.0);
    a = a * a * vNoise;

    vec3 color = vColor + a * a * a;

    a *= uAlpha;

    gl_FragColor = vec4(color, a);
}
