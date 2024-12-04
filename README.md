## About stepFX

This function triggers a step sound effect from a predefined set of sounds.
The sounds are sourced from "leohpaz" and can be found at https://thowsenmedia.itch.io/.

**Note:** Please do not redistribute the sound files in any project other than adding stepFX to your Workadventure.

    - Credits:
    - Sounds by "leohpaz" (https://thowsenmedia.itch.io/)
    - stepFX created by Kilian (https://github.com/klinshy) and Pedro (https://github.com/PedCoelho)

You can try (AND HEAR) a demo with all sound files [HERE](https://play.workadventu.re/_/04occgjyqgr1/komponentab.github.io/stepFX/office.tmj).
Or see a video of it in motion [HERE](https://rec.cocreation.world/8YwkJZHL)!

## Applying stepFX to Your Room

1.  ### Set up Vite config file's base variable (if hosting on GITHUB PAGES or any sub-domain):

    Update the `vite.config.ts` file with the repository's GitHub page path.
    In your case, set the base to `/your-repository-name`.

    ```ts
    //vite.config.ts

    export default defineConfig({
      base: "/your-repository-name",
      // other configurations
    });
    ```

    For example if your map is hosted on GitHub at the Repository `my-map`put '/my-map' at the base. **This is only needed if the sound is hosted on a sub-domain, as it is in our example.**

    Sounds are hosted at `https://komponentworksab.github.io/stepFX/sounds`, and they will be loaded from there by WorkAdventure.

    If you host your audio files on S3 or Firebase, you dont need to make any changes to `vite.config.ts` and can simply replace

    ```ts
    //footstep.ts

    ${import.meta.env.BASE_URL}/sounds/${soundFiles[material][randomIndex]}
    ```

    with the actual address where your files are hosted. (e.i. `https://file-storage.com/${soundFiles[material][randomIndex]}`).

2.  ### Update `main.ts`:

    Add the following code to your `main.ts` file to integrate stepFX:

    ```ts
    //main.ts

    import { checkPlayerMaterial, mySound, playRandomSound } from "./footstep";

    WA.onInit().then(async () => {
      WA.player.onPlayerMove(async ({ x, y, moving }) => {
        const material = await checkPlayerMaterial({ x, y });
        console.log(material);

        if (!material) {
          return mySound?.stop();
        }

        if (!moving && !material) {
          return mySound?.stop();
        } else {
          mySound?.stop();
          return playRandomSound(material);
        }
      });
    });
    ```

3.  ### Add the `config/footstep.config.ts`

    This file contains Typescript type-definitions and a mapping between different `MaterialTypes` and their respective `filenames`. Keep in mind, a single material can be associated with multiple audio-files to introduce diversity in the audio playback.

4.  ### Add the `footstep.ts` file:

    This is the file with all the functions / behaviours associated with the playing of the audio files.

5.  ### Add sounds to the map:

    To add sounds to the map, follow these steps:

    - In Tiled Map Editor, create an area object in the desired layer (e.g., "floorLayer"). The area can have any name (e.g., `wood_area-1`) but must be of class `area`. If you have multiple areas of the same material, ensure each area has a unique name.
    - Add the following custom properties to the area in Tiled:
      - `material` (string): Choose and type from the following options: `wood`, `stone`, `snow`, `forest`, `water`, `marble`, `mud`, `path`, `sand`.
      - `stepSound` (boolean): Set to `true`.

    This setup will allow the stepFX to recognize the material and play the corresponding sound when the player moves over the area.

    /**
     * This method is responsible for loading and defining sounds for different areas.
     * 
     * Note for improvement:
     * It might be easier to load/define the sounds using Tiles or Tiled Layers. 
     * Doing it over areas is quite cumbersome, especially when dealing with intricate paths.
     * 
     * We started the implementation using TileLayer but did not complete it. 
     * Most maps do not have many different materials. 
     * Therefore, it might be feasible to add 3 additional Tiled Layers to define the materials. 
     * This would make it easier to define intricate paths or frequent material changes.
     * 
     * In an ideal world, there would be only ONE single layer, with different tiles in it. 
     * Each tile defines the material.
     */
