uniform sampler2D tMap;
uniform float uFade;
uniform float uStarBrightness;
uniform vec3 uRandomSize;
uniform float uRotateSpeed;

varying vec2 vUv;
varying vec3 vColor;
varying float vAngle;

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

void main() {
    vec2 uv = vUv;
    vec3 color = texture2D(tMap, vUv).rgb;
    if (length(color) < 0.5) discard;

    color = vColor * color.b + color.r * uStarBrightness;
    color = pow(color, vec3(2.2));
    color = mix(color, vec3(0.0), uFade);

    float alpha = mix(1.0, vAngle, 0.7);

    gl_FragColor = vec4(color, alpha);
}
