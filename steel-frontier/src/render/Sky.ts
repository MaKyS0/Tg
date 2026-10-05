import { BackSide, Color, Mesh, ShaderMaterial, SphereGeometry, Vector3 } from 'three';

const VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 topColor;
  uniform vec3 horizonColor;
  uniform vec3 groundColor;
  uniform vec3 sunDir;
  uniform vec3 sunColor;
  uniform float time;
  uniform float cloudiness;
  varying vec3 vDir;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float s = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { s += a * noise(p); p *= 2.03; a *= 0.5; }
    return s;
  }
  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 col = h > 0.0 ? mix(horizonColor, topColor, pow(clamp(h, 0.0, 1.0), 0.55)) : mix(horizonColor, groundColor, clamp(-h * 4.0, 0.0, 1.0));
    float sd = max(dot(d, normalize(sunDir)), 0.0);
    col += sunColor * (pow(sd, 900.0) * 6.0 + pow(sd, 12.0) * 0.25);
    if (h > 0.0) {
      vec2 cp = d.xz / (h + 0.12) * 1.6 + vec2(time * 0.004, time * 0.002);
      float c = smoothstep(1.0 - cloudiness, 1.0, fbm(cp));
      vec3 cloud = mix(vec3(1.0), horizonColor * 0.85, 0.35) + sunColor * pow(sd, 6.0) * 0.3;
      col = mix(col, cloud, c * smoothstep(0.0, 0.18, h) * 0.85);
    }
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

/** Gradient sky dome with sun disc/halo and procedural drifting clouds. */
export class Sky {
  readonly mesh: Mesh;
  private material: ShaderMaterial;

  constructor(top: string, horizon: string, sunDir: Vector3, sunColor: string, cloudiness = 0.45) {
    this.material = new ShaderMaterial({
      uniforms: {
        topColor: { value: new Color(top) },
        horizonColor: { value: new Color(horizon) },
        groundColor: { value: new Color(horizon).multiplyScalar(0.7) },
        sunDir: { value: sunDir.clone().normalize() },
        sunColor: { value: new Color(sunColor) },
        time: { value: 0 },
        cloudiness: { value: cloudiness },
      },
      vertexShader: VERT,
      fragmentShader: FRAG,
      side: BackSide,
      depthWrite: false,
      fog: false,
    });
    this.mesh = new Mesh(new SphereGeometry(3000, 32, 16), this.material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -10;
  }

  update(time: number, cameraPos: Vector3): void {
    this.material.uniforms.time.value = time;
    this.mesh.position.copy(cameraPos);
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}
