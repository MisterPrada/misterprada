#define PI 3.1415926535897932384626433832795
uniform float uTime;
uniform float uSize;
uniform float uLineEach;

attribute vec3 aRandomness;
attribute float aScale;
attribute float aPositionIndex;

varying vec3 vColor;

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

        modelPosition.y = (tan(angle) * distanceToCenter);

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



    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
     * Size
     */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    /**
     * Color
     */
    vColor = color;
}
