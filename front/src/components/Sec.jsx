import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
 


function Snowfall() {
    const containerRef = useRef(null), [ init, setInit ] = useState(false);

    useEffect(() => {
        if (init) {
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, [ init ]);

    const particlesLoaded = useCallback(
            (container) => {
                containerRef.current = container;

                window.particlesContainer = container;
            },
            [ containerRef ]
        ),
        options = useMemo(
            () => ({
                fullScreen: {
                    zIndex: -1,
                },
                particles: {
                    number: {
                        value: 200,
                    },
                    links: {
                        enable: true,
                    },
                    move: {
                        enable: true,
                    },
                },
                themes: [
                    {
                        name: "light",
                        default: {
                            value: true,
                            auto: true,
                            mode: "light",
                        },
                        options: {
                            background: {
                                color: "#87CEEB",
                            },
                            particles: {
                                color: {
                                    value: "#000000",
                                },
                                links: {
                                    color: "#000000",
                                },
                            },
                        },
                    },
                ],
            }),
            []
        ),
        lightTheme = () => {
            containerRef.current?.loadTheme("light");
         };

    return (
        <div className="App">
          <div className="justify-items-center items-center">
            Hello
          </div>
            {init && (
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                />
            )}
        </div>
    );
}

export default Snowfall;