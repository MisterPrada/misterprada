varying vec2 vUv;
varying float vAngle;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;

    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 view = normalize(cameraPosition - position);
    vAngle = 1.0 - pow(1.0 - abs(dot(up, view)), 4.0);
}
