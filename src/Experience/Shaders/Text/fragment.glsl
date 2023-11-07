uniform float uTime;
uniform float uOpacity;
uniform vec2 uResolution;

varying vec2 vUv;

#define _ ;p.y+=sin((p.x-=3.)+uTime)*.2;q.x=abs((q=v=p).x);gl_FragColor+=.04*(cos(p.x*.7+uTime+t)+1.2)/
#define l(p,a) length(p-a+a*clamp(dot(a-p,a)/dot(a,a),0.,1.))
#define h(f)   _ min(l((p=q), f), J);p=v+t.zx
#define J      l(abs(p-t.yx), t.xz)


#define TJ     l(abs(p+t.yx), t.xz)

#define Eh(f)  _ min(l((p=q), f), EJ);p=v+t.zx
#define EJ       l(abs(p+t.yx * 2.5), t.xz)
#define EJ2      l(abs(p.y-t.xz), vec2(0.0, 0.0))
#define EJ3      l(33333.1, vec2(0.0, 0.0))

#define RJ      l(abs(p+t.yx * vec2(8.6)), t.xz)
#define RJ2     l(abs(p+t.yx * vec2(9.6)), t.xz)

#define S _ (abs(p.x + sin(p.y*1.5))+pow(abs(p.y)*.3, 8.))
#define M   h(t.yz)
#define I _ J
#define T _ min(TJ, min(20., l(vec2(p.y-1.3, p.x + 2.0), t.yz)))


#define E _ min(EJ, min(20., l(vec2(p.y-2.0, p.x + 2.5), t.wz))) _ min(EJ2, min(20., l(vec2(p.y, p.x + 5.4), t.wz))) _ min(EJ3, min(20., l(vec2(p.y+2.0, p.x + 8.4), t.wz)))

#define R _ min(RJ, min(20., l(vec2(-p.x-6.7, abs(p.y - 0.9) + 0.8), t.zz))) _ min(EJ3, min(20., l(vec2(-p.x-10.1, p.y + 1.7 + 0.1), sqrt(t.zz) )))


#define P _ min(RJ, min(20., l(vec2(sqrt(-p.x-6.7), abs(p.y - 0.9) + 0.8), t.zz)))

#define R3 _ min(RJ2, min(20., l(vec2(-p.x-7.7, abs(p.y - 0.9) + 0.8), t.zz)))
#define R4 _ min(EJ3, min(20., l(vec2(-p.x-11.1, p.y + 1.6 + 0.1), sqrt(t.zz) )))

#define Al(p,a) length(p-a+a*clamp(dot(a-p,a)/dot(a,a), 0.0, 1.0))
#define AJ      Al(abs(p+t.yx * vec2(8.6)), t.xz)
#define A1 _ min(EJ3, min(20., l(vec2(p.x+14.1, p.y + 2.0), sinh(t.yz + 0.1) )))

#define AJ2      Al(abs(p+t.yx * vec2(8.6)), t.xz)
#define A2 _ min(EJ3, min(20., l(vec2(-p.x-14.5, p.y + 2.0), sinh(t.yz + 0.1) )))

#define AJ3      l(33333.1, vec2(0.0, 0.0))
#define A3 _ min(AJ3, min(20., l(vec2(p.y, p.x + 19.8), t.wz)))

#define DJ  l(abs(p+t.yx * vec2(19.6)), t.xz)
#define D _ min(DJ, min(20., l(vec2(-p.x-17.7, abs(p.y - 0.1)), t.zz)))


#define Al4(p,a) length(p-a+a*clamp(dot(a-p,a)/dot(a,a), 0.0, 1.0))
#define AJ4      Al(abs(p+t.yx * vec2(8.6)), t.xz)
#define A4 _ min(EJ3, min(20., l(vec2(p.x + 20.1, p.y + 2.0), sinh(t.yz + 0.1) )))

#define AJ5      Al(abs(p+t.yx * vec2(8.6)), t.xz)
#define A5 _ min(EJ3, min(20., l(vec2(-p.x-20.5, p.y + 2.0), sinh(t.yz + 0.1) )))

#define AJ6      l(33333.1, vec2(0.0, 0.0))
#define A6 _ min(AJ3, min(20., l(vec2(p.y, p.x + 25.8), t.wz)))

#define POINT _ min(AJ3, min(20., l(vec2(p.y - 3.7, p.x + 53.0), t.ww)))


void main()
{
    float aspect	= uResolution.x/uResolution.y;
    vec2 uv			= vUv.xy;

    //vec2 F = gl_FragCoord.xy;
    vec2 i = uResolution.xy, p = (uv - .45)/i.x * 5000., q, v;

    p.x -= 2.1;

    vec4 t = vec4(0,1,2,0); p.x += 16.5; gl_FragColor *= 0.;


    M I S T E R P R3 R4 A1 A2 A3 D A4 A5 A6 POINT;

    //gl_FragColor.a = step(0.19, gl_FragColor.r);

    gl_FragColor.rgb = mix(vec3(0.0), vec3(1.0), gl_FragColor.r * uOpacity);
    gl_FragColor.rgb -= 0.1;
    gl_FragColor.a = smoothstep(0.3, 0.7, mix(0.0, 2.0, gl_FragColor.r * uOpacity));
}

