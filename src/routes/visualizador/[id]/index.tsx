/* eslint-disable prefer-const */
import { component$, useSignal, $ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { OneScene } from "~/components/one-scene/one-scene";
import { fetchData } from "~/service/motors-service";
import "./visualizador-style.scss";
import { SceneButton } from "~/components/scene-button/scene-button";
import { ReelExtras } from "~/components/reel-extras/reel-extras";
export interface EscenaVehiculo {
  name: string;
  images: string[];
  numberImages: number;
  active: boolean;
  id:string
}

export const useVehicles = routeLoader$<EscenaVehiculo[]>(async () => {
  const result = await fetchData("693");
  const aux = result["escenas"];
  let vehicles: EscenaVehiculo[] = [];
  for (let key in aux) {
    const nameScene: string = aux[key]["nombre"];
    if (nameScene != "interior") {
      // eslint-disable-next-line prefer-const
      let imagenesJson = aux[key]["imagenes"];
      let imagesScene: string[] = [];
      for (const imagen in imagenesJson) {
        imagesScene.push(
          `https://3dmotores.com/ObjetosVirtuales/693${imagenesJson[imagen]["path"]}`.replace(
            "frames",
            "frames_compresos",
          ),
        );
      }
      let scene: EscenaVehiculo = {
        name: nameScene,
        images: imagesScene,
        numberImages: imagesScene.length,
        active: false,
        id:'693'
      };
      vehicles.push(scene);
    }
  }
  return vehicles;
});

export default component$(() => {
  const allScenes = useVehicles();
  const currentScene = useSignal<number>(1);
  const rotateEnable = useSignal<boolean>(false);

  const changeScene = $((index: number) => {
    currentScene.value = index;
    //rotateEnable.value = false;
  });

  return (
    <>
      <div class="scene-buttons-container center-absolute-x z-index-10">
        <div class="select-none" onClick$={() => changeScene(0)}>
          <SceneButton icon="cerradas" isActive={currentScene.value == 0} />
        </div>
        <div class="select-none" onClick$={() => changeScene(1)}>
          <SceneButton icon="abiertas" isActive={currentScene.value == 1} />
        </div>
        <div class="select-none" onClick$={() => changeScene(2)}>
          <SceneButton icon="interior" isActive={currentScene.value == 2} />
        </div>
        <div
          class="select-none"
          onClick$={() => {
            rotateEnable.value = !rotateEnable.value;
          }}
        >
          <SceneButton icon="rotar" isActive={rotateEnable.value} />
        </div>
        <div class="select-none" onClick$={() => {}}>
          <SceneButton icon="informacion" isActive={false} />
        </div>
      </div>

      <div class="visualizador-container">
        <OneScene
          key={"1as"}
          rotate={currentScene.value == 0 && rotateEnable.value}
          active={currentScene.value == 0}
          name={"puertas-abiertas"}
          images={allScenes.value[1].images}
          numberImages={allScenes.value[1].numberImages}
        />
        <OneScene
          key={"2as"}
          rotate={currentScene.value == 1 && rotateEnable.value}
          active={currentScene.value == 1}
          name={"puertas-cerradas"}
          images={allScenes.value[0].images}
          numberImages={allScenes.value[0].numberImages}
        />
        <OneScene
          key={"3as"}
          rotate={currentScene.value == 2 && rotateEnable.value}
          active={currentScene.value == 2}
          name={"interior"}
          images={allScenes.value[0].images}
          numberImages={allScenes.value[0].numberImages}
        />
        {/**<ReelExtras id={'679'}/>/ */}
        
      </div>
      
    </>
  );
});
