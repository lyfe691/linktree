import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          opacity: 0,
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "rgba(255, 255, 255, 0.15)",
            distance: 150,
            enable: true,
            opacity: 0.15,
            width: 0.8,
          },
          move: {
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8,
            straight: false,
          },
          number: {
            value: 100,
            density: {
              enable: true,
              area: 800,
            },
          },
          opacity: {
            value: 0.15,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
          wobble: {
            enable: true,
            distance: 2,
            speed: 0.5,
          },
        },
        detectRetina: true,
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.3,
              },
            },
          },
        },
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
};

export default ParticlesBackground; 