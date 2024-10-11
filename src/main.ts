/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getStepSoundAreas, checkPlayerMaterial, playRandomSound, mySound } from './footstep';

console.log('Script started successfully');
// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
   })

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
bootstrapExtra().then(() => {
    console.log('Scripting API Extra ready');
}).catch((e: any) => console.error(e));


WA.onInit().then(async () => {
    var areaName: any = getStepSoundAreas.name
    let lastMaterial: string | null = null;
    let isPlaying = false;


    WA.player.onPlayerMove(async (event) => {
        const playerPosition = { x: event.x, y: event.y };
        const material = await checkPlayerMaterial(playerPosition);

        if (event.moving) {
            if (material && material !== lastMaterial) {
                if (isPlaying) {
                    mySound.stop();
                    isPlaying = false;
                }
                playRandomSound(material);
                lastMaterial = material;
                isPlaying = true;

            } else if (material && !isPlaying) {
                playRandomSound(material);
                isPlaying = true;

            }
        } else {
            if (isPlaying) {
                mySound.stop();
                isPlaying = false;
                
                }
            }
            lastMaterial = null;
        }
    );

    // Stop all sounds when leaving an area
    WA.room.area.onLeave(`${areaName}`).subscribe(() => {
        try {
            console.log(`Player is leaving area: ${areaName}`);
            mySound.stop();
            lastMaterial = null;
            console.log(`Player left area: ${areaName}`);
        } catch (error) {
            console.error(`Error while stopping sound or resetting material for area ${areaName}: ${error}`);
        }
    });
});
export {};
