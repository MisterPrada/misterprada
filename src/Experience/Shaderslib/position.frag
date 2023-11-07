// simulation
varying vec2 vUv;
uniform sampler2D tPositions;
uniform sampler2D tVelocity;

float delta = 0.056;


void main() {

      vec4 pos = texture2D(tPositions, vUv);

      float life = pos.a;
      life = clamp(life,0.0,1.0);
      vec4 vel = texture2D(tVelocity, vUv);
      pos.xyz += vel.xyz * delta;
      life += 0.001;

      gl_FragColor = vec4(pos.xyz,life);

}
