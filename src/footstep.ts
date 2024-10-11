import { getLayersMap } from "@workadventure/scripting-api-extra/dist";
import { Json } from "@workadventure/tiled-map-type-guard";

const soundFiles = {
    wood: [
        '/src/sound/wood_01_a.wav',
        '/src/sound/wood_01_b.wav',
        '/src/sound/wood_01_c.wav',
        '/src/sound/wood_01_d.wav'
    ],
    forest: [
        '/src/sound/forest_01.wav',
        '/src/sound/forest_02.wav',
        '/src/sound/forest_03.wav'
    ],
    snow: [
        '/src/sound/snow_01_a.wav',
        '/src/sound/snow_01_b.wav',
        '/src/sound/snow_01_c.wav',
        '/src/sound/snow_01_d.wav'
    ],
    marble: [
        '/src/sound/marble_01.wav',
        '/src/sound/marble_02.wav',
        '/src/sound/marble_03.wav'
    ],
    grass: [
        '/src/sound/grass_01.wav',
        '/src/sound/grass_02.wav',
        '/src/sound/grass_03.wav'
    ],
    stone: [
        '/src/sound/stone_01_a.wav',
        '/src/sound/stone_01_b.wav',
        '/src/sound/stone_01_c.wav',
        '/src/sound/stone_01_d.wav',
        '/src/sound/stone_01_e.wav'
    ]
};

const config = {
    volume: 0.025,
    loop: false,
    rate: 1.5,
    detune: 1,
    delay: 0,
    seek: 0,
    mute: false,
};

let isPlaying = false;
let mySound: any;
let stepSoundAreas: any[] = [];
let lastMaterial: MaterialType | null = null;
let soundInterval: any = null;

type MaterialType = keyof typeof soundFiles;

function playRandomSound(material: MaterialType) {
    if (!soundFiles[material]) return;

    const randomIndex = Math.floor(Math.random() * soundFiles[material].length);
    mySound = WA.sound.loadSound(soundFiles[material][randomIndex]);
    mySound.play(config);
    isPlaying = true;
}

function stopSound() {
    if (mySound) {
        mySound.stop();
        isPlaying = false;
    }
    if (soundInterval) {
        clearInterval(soundInterval);
        soundInterval = null;
    }
}

async function getStepSoundAreas() {
    try {
        const layers = await getLayersMap();
        const areas = [];

        for (const layer of layers.values()) {
            if (layer.type === 'objectgroup') {
                for (const object of layer.objects) {
                    if (object.properties && object.properties.some(prop => prop.name === 'stepSound' && prop.value === true)) {
                        const materialProperty = object.properties.find(prop => prop.name === 'material');
                        const material = materialProperty ? materialProperty.value : null;
                        if (typeof material === 'string' && ["wood", "forest", "snow", "marble", "grass", "stone"].includes(material)) {
                            areas.push({
                                name: object.name,
                                x: object.x,
                                y: object.y,
                                width: object.width,
                                height: object.height,
                                material: material
                            });
                        }
                    }
                }
            }
        }
        console.log('Found step sound areas:', areas);
        return areas;
    } catch (error) {
        console.error('Error while getting step sound areas:', error);
        return [];
    }
}

function isInsideArea(playerPosition: { x: number; y: number; }, area: { name?: string; x: any; y: any; width: any; height: any; material?: string | number | true | { [key: string]: Json; } | Json[]; }) {
    return (
        playerPosition.x >= area.x &&
        playerPosition.x <= area.x + area.width &&
        playerPosition.y >= area.y &&
        playerPosition.y <= area.y + area.height
    );
}

async function checkPlayerMaterial(playerPosition: { x: number; y: number; }) {
    try {
        for (const area of stepSoundAreas) {
            if (isInsideArea(playerPosition, area)) {
                return area.material;
            }
        }
        return null;
    } catch (error) {
        console.error('Error while checking player material:', error);
        return null;
    }
}

WA.onInit().then(async () => {
    stepSoundAreas = await getStepSoundAreas();
});

export { getStepSoundAreas, checkPlayerMaterial, playRandomSound, stopSound, isInsideArea, lastMaterial, isPlaying, mySound };
export type { MaterialType };