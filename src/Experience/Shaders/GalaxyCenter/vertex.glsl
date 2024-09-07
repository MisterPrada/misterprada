uniform sampler2D tMap;

varying vec2 vUv;
varying float vAngle;

// rotate x
mat3 rotationX(float angle) {
    return mat3(
        1.0, 0.0, 0.0,
        0.0, cos(angle), -sin(angle),
        0.0, sin(angle), cos(angle)
    );
}

void main() {
    vec3 pos = position;

    vec3 cameraRightWorld = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 cameraUpWorld = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    vec3 cameraForwardWorld = vec3(-viewMatrix[0][2], -viewMatrix[1][2], -viewMatrix[2][2]);

    float billboardSize = 0.5;
    vec3 center = vec3(0.0);
    // center.y += billboardSize * 0.5;

    vec2 st = uv * 2.0 - 1.0;

    vec3 vertexPosition =
    center
    + cameraRightWorld * st.x * billboardSize
    + cameraUpWorld * st.y * billboardSize;

    pos = vertexPosition;
    pos = rotationX(0.3) * pos;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;

    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 eye = normalize(cameraPosition - position);
    vAngle = dot(up, eye);
    vAngle = abs(vAngle);
    vAngle = 1.0 - pow(1.0 - vAngle, 2.0);
}
