uniform sampler2D uMap;

uniform vec2 uRange1;
uniform vec2 uRange2;
uniform vec2 uRange3;

uniform float uTime;
uniform float uAlpha;
uniform float uShear;
uniform float uSpeed;
uniform float uScale;

uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;
varying float vAngle;

void main() {
    vec2 uv = vUv;
    uv.y *= uScale;

    float time = uTime;

    float t = time * uSpeed;
    uv.x += vUv.y * uShear + t * -uShear;

    float alpha = texture2D(uMap, uv).r;
    alpha *= texture2D(uMap, uv * 2.0).r;

    alpha *= smoothstep(uRange1.x, uRange1.y, vUv.y);
    alpha *= smoothstep(uRange2.x, uRange2.y, vUv.y);
    alpha = smoothstep(uRange3.x, uRange3.y, alpha);
    alpha = pow(alpha, 0.25);
    alpha *= uAlpha;

    alpha *= vAngle;

    vec3 color = mix(uColor1, uColor2, 1.0 - vUv.y);

    gl_FragColor = vec4(color, alpha);
}
