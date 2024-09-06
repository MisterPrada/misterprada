attribute vec4 random;
attribute vec3 offset;

uniform sampler2D tMap;
uniform float uFade;
uniform float uStarBrightness;
uniform vec3 uRandomSize;
uniform float uRotateSpeed;
uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;
varying float vAngle;

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

// rotate x
mat3 rotationX(float angle) {
    return mat3(
    1.0, 0.0, 0.0,
    0.0, cos(angle), -sin(angle),
    0.0, sin(angle), cos(angle)
    );
}

void main() {
    float time = uTime;
    vec3 pos = position;

    vec3 cameraRightWorld = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 cameraUpWorld = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    vec3 cameraForwardWorld = vec3(-viewMatrix[0][2], -viewMatrix[1][2], -viewMatrix[2][2]);

    float billboardSize = 0.01 + smoothstep(uRandomSize.x, uRandomSize.y, random.w) * uRandomSize.z;
    vec3 center = offset;
    vec2 st = uv * 2.0 - 1.0;

    center.xz = rotate(center.xz, time * uRotateSpeed);

    vec3 vertexPosition = center
    + cameraRightWorld * st.x * billboardSize
    + cameraUpWorld * st.y * billboardSize;

    pos = vertexPosition;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
    vUv -= 0.5;
    vUv = rotate(vUv, random.w * 3.14 * 2.0 + sin(offset.x * 3000.0));
    vUv += 0.5;
    vColor = random.xyz;

    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 eye = normalize(cameraPosition - position);
    vAngle = dot(up, eye);
    vAngle = abs(vAngle);
    vAngle = 1.0 - pow(1.0 - vAngle, 2.0);
}
