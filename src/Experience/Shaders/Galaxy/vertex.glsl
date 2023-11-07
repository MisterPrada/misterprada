#define PI 3.1415926535897932384626433832795
uniform float uTime;
uniform float uSize;
uniform float uLineEach;
uniform float uPositionX;
uniform float uPositionY;
uniform float uPositionZ;

attribute vec3 aRandomness;
attribute float aScale;
attribute float aPositionIndex;

varying vec3 vColor;
varying float vDistanceToCenter;

mat4 getRotationMatrix(vec3 axis, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    float t = 1.0 - c;
    float x = axis.x, y = axis.y, z = axis.z;
    float tx = t * x, ty = t * y;

    return mat4(
    tx * x + c,     tx * y - s * z, tx * z + s * y, 0.0,
    tx * y + s * z, ty * y + c,     ty * z - s * x, 0.0,
    tx * z - s * y, ty * z + s * x, t * z * z + c,  0.0,
    0.0,            0.0,            0.0,            1.0
    );
}

void main()
{
    /**
     * Position
     */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);


    if (mod(aPositionIndex, uLineEach) == 0.0) {
        // Rotate
        float angle = atan(modelPosition.x, modelPosition.z);
        float distanceToCenter = length(modelPosition.xz);
        float angleOffset = (1.0 / distanceToCenter) * ((uTime) + 100.0);
        angle = angleOffset;

        modelPosition.x = 0.0;
        modelPosition.z = 0.0;


        if (mod(aPositionIndex, 2.0) == 0.0) {
            modelPosition.y = (tan(angle) * distanceToCenter);

            if (modelPosition.y < 0.0) {
                modelPosition.y = 0.0;
            }
        }else{
            modelPosition.y = (-tan(angle) * distanceToCenter);

            if (modelPosition.y > 0.0) {
                modelPosition.y = 0.0;
            }
        }

        //modelPosition.y += 3.0;


        // Randomness
        modelPosition.xyz -= aRandomness;
    } else {

        // Rotate
        float angle = atan(modelPosition.x, modelPosition.z);
        float distanceToCenter = length(modelPosition.xz);
        //    float angleOffset = (1.0 / distanceToCenter) * (atan(uTime) + 5.0);
        //    angle += angleOffset + uTime * 0.01;

        float delay = .4;  // Delay in seconds
        float t = clamp(uTime / delay, 0.0, 1.0);  // Reduce 1 to 0 in delay seconds
        float timeFactor = mix(uTime, sqrt(uTime), t);
        float angleOffset = (1.0 / distanceToCenter) * timeFactor * 2.5;


        //float angleOffset = (1.0 / distanceToCenter) * sqrt(max(uTime, uTime - delay));
        angle -= angleOffset;

        modelPosition.x = cos(angle) * distanceToCenter;
        modelPosition.z = sin(angle) * distanceToCenter;

        // Randomness
        modelPosition.xyz += aRandomness;
    }

    float angle = radians(20.);

    mat4 rotationMatrix = getRotationMatrix(vec3(0.6, 1.0, 0.0), 30.);
    vec4 modelPositionCustom = modelPosition;
    modelPositionCustom.x += uPositionX;
    modelPositionCustom.y += uPositionY;
    modelPositionCustom.z += uPositionZ;

    mat4 scaleMatrix = mat4(2.5, 0.0, 0.0, 0.0,
                            0.0, 2.5, 0.0, 0.0,
                            0.0, 0.0, 2.5, 0.0,
                            0.0, 0.0, 0.0, 1.0);

    vec4 rotatedPosition = rotationMatrix * modelPositionCustom;

    vec4 viewPosition = viewMatrix * rotatedPosition;

    gl_Position = projectionMatrix * viewPosition;


    /**
     * Size
     */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);
    /**
     * Color
     */
    vColor = color;
    vDistanceToCenter = length(modelPosition);
}
