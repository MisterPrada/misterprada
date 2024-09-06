uniform sampler2D tMap;

varying vec2 vUv;
varying float vAngle;

void main() {
    float radialGradient = 1.0 - length(vUv - 0.5) * 2.0;
    float a = radialGradient;
    a = clamp(a, 0.0, 1.0);
    a = pow(a, 2.0);

    float centerGlow = pow(radialGradient, 8.0) * 0.6;
    a += centerGlow;
    a = smoothstep(0.0, 1.0, a);
    a *= 0.6;
    a += centerGlow;

    vec3 color = vec3(221.0, 150.0, 80.0) / 255.0;
    color = pow(color, vec3(2.2));
    vec3 color2 = vec3(109.0, 112.0, 138.0) / 255.0;
    color2 = pow(color2, vec3(2.2));

    color = mix(color2, color, smoothstep(0.7, 1.0, radialGradient));
    color *= mix(1.0, vAngle, 0.6);
    color += pow(centerGlow, 1.3) * 1.5;
    color = pow(color, vec3(0.45));
    color *= mix(vec3(1.0), color, 0.5);
    color = smoothstep(0.0, 1.0, color);

    a *= 0.95;

    gl_FragColor = vec4(color, a);
}
