"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform vec2 uRes;
  uniform vec2 uImg;
  uniform vec2 uMouse;
  uniform float uTime;

  float grain(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    float rs = uRes.x / uRes.y;
    float ri = uImg.x / uImg.y;
    vec2 nw = (rs < ri) ? vec2(uImg.x * uRes.y / uImg.y, uRes.y)
                        : vec2(uRes.x, uImg.y * uRes.x / uImg.x);
    vec2 off = ((rs < ri) ? vec2((nw.x - uRes.x) * 0.5, 0.0)
                          : vec2(0.0, (nw.y - uRes.y) * 0.5)) / nw;
    vec2 uv = vUv * uRes / nw + off;

    float depth = smoothstep(0.55, 1.0, 1.0 - uv.y);
    uv.x += sin(uv.y * 26.0 + uTime * 0.9) * 0.0018 * depth;
    uv.y += cos(uv.x * 22.0 + uTime * 0.7) * 0.0016 * depth;
    uv += uMouse * 0.008;

    vec3 col = texture2D(uTex, uv).rgb;
    col += 0.03 * sin(uv.x * 3.0 + uTime * 0.4) * depth;
    col += (grain(vUv + fract(uTime)) - 0.5) * 0.035;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane({ image }: { image: string }) {
  const tex = useTexture(image);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(() => {
    const img = tex.image as HTMLImageElement | undefined;
    return {
      uTex: { value: tex },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
      uImg: { value: new THREE.Vector2(img?.naturalWidth || 1600, img?.naturalHeight || 1067) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tex]);

  useFrame((state, delta) => {
    target.current.set(state.pointer.x, state.pointer.y);
    mouse.current.lerp(target.current, 0.06);
    if (mat.current) {
      mat.current.uniforms.uTime.value += delta;
      mat.current.uniforms.uMouse.value.copy(mouse.current);
      mat.current.uniforms.uRes.value.set(size.width, size.height);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

export default function WebGLHero({ image }: { image: string }) {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 1], fov: 50 }}
    >
      <Plane image={image} />
    </Canvas>
  );
}
