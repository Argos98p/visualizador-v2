import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";


import { SpinnerLoad } from "../spinner-loader/spinner-load";
import "./one-scene-style.scss";

interface Props {
  name: string;
  images: string[];
  numberImages: number;
  active: boolean;
  rotate: boolean;
}

export const OneScene = component$<Props>((scene) => {
  const loadPercentage = useSignal(0);
  const currentIndex = useSignal(20);
  const draggableRef = useSignal<HTMLElement>();
  const drag = useSignal(false);
  const lastX = useSignal<number>(1);
  const intervalID = useSignal<null| number >(null);


  const nextFrame = $(() => {
    const elementImg = document.getElementById(
      `${scene.name}-img-${currentIndex.value}`,
    );
    elementImg?.classList.add("hidden");

    currentIndex.value == scene.numberImages - 1
      ? (currentIndex.value = 0)
      : (currentIndex.value = currentIndex.value + 1);
    const elementImg2 = document.getElementById(
      `${scene.name}-img-${currentIndex.value}`,
    );
    elementImg2?.classList.remove("hidden");
  });

  const prevFrame = $(() => {
    const elementImg = document.getElementById(
      `${scene.name}-img-${currentIndex.value}`,
    );
    elementImg?.classList.add("hidden");
    currentIndex.value == 0
      ? (currentIndex.value = scene.numberImages - 1)
      : (currentIndex.value = currentIndex.value - 1);
    const elementImg2 = document.getElementById(
      `${scene.name}-img-${currentIndex.value}`,
    );
    elementImg2?.classList.remove("hidden");
  });

  const loadImage = $(
    (src: string, index: number, divVisualizador: HTMLElement) => {
      return new Promise((resolve, reject) => {
        const img = document.createElement("img");

        img.id = `${scene.name}-img-${index}`;
        img.onerror = (error) => reject(error);
        img.src = src;
        img.classList.add("w-max");
        index != currentIndex.value && img.classList.add("hidden");
        img.onload = () => {
          resolve(img);
          divVisualizador!.appendChild(img);
          loadPercentage.value = Math.ceil((index * 100) / scene.numberImages);
        };
      });
    },
  );

  useVisibleTask$(({track}) => {
    track(() => scene.rotate);

    if(intervalID.value==null){
      if (loadPercentage.value > 98 && scene.rotate) {

        const myInterval= window.setInterval((()=>{
          nextFrame();
        }), 100);

        intervalID.value = myInterval;
        
      }
    }else{
      if(loadPercentage.value > 98 && scene.rotate==false){
        clearInterval(intervalID.value);
        intervalID.value=null;
      }
    }
    
    
    
  });

  useVisibleTask$(({ cleanup }) => {
    if (draggableRef.value) {
      const mouseMoveHandler = (e: MouseEvent) => {
        e.preventDefault();
        if (drag.value) {
          if (lastX.value == 1) {
            lastX.value = e.clientX;
          } else {
            Math.abs(e.clientX) > Math.abs(lastX.value)
              ? prevFrame()
              : nextFrame();

            lastX.value = e.clientX;
          }
        }
      };
      const mouseDownHandler = (e: MouseEvent) => {
        e.preventDefault();
        drag.value = true;
      };
      const mouseUpHandler = (e: MouseEvent) => {
        e.preventDefault();
        drag.value = false;
      };

      const touchStartHandler = (e: TouchEvent) => {
        e.preventDefault();
        drag.value = true;
      };

      const touchEndHandler = (e: TouchEvent) => {
        e.preventDefault();
        drag.value = false;
      };

      const touchMoveHandler = (e: TouchEvent) => {
        e.preventDefault();
        if (drag.value) {
          if (lastX.value == 1) {
            lastX.value = e.touches[0].clientX;
          } else {
            Math.abs(e.touches[0].clientX) > Math.abs(lastX.value)
              ? prevFrame()
              : nextFrame();

            lastX.value = e.touches[0].clientX;
          }
        }
      };

      draggableRef.value!.addEventListener("mousedown", mouseDownHandler);
      draggableRef.value!.addEventListener("mouseup", mouseUpHandler);
      draggableRef.value!.addEventListener("mousemove", mouseMoveHandler);

      draggableRef.value!.addEventListener("touchstart", touchStartHandler);
      draggableRef.value!.addEventListener("touchend", touchEndHandler);
      draggableRef.value!.addEventListener("touchmove", touchMoveHandler);

      

      cleanup(() => {
        draggableRef.value!.removeEventListener("mousedown", mouseDownHandler);
        draggableRef.value!.removeEventListener("mouseup", mouseUpHandler);
        draggableRef.value!.removeEventListener("mousemove", mouseMoveHandler);

        draggableRef.value!.removeEventListener(
          "touchstart",
          touchStartHandler,
        );
        draggableRef.value!.removeEventListener("touchend", touchEndHandler);
        draggableRef.value!.removeEventListener("touchmove", touchMoveHandler);
      });
    }
  });

  useVisibleTask$(async () => {
    const divVisualizador = document.getElementById(
      `${scene.name}-visualizador`,
    );
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < scene.numberImages; i++) {
      const image = (await loadImage(
        scene.images[i],
        i,
        divVisualizador!,
      )) as HTMLImageElement;
      images.push(image);
    }
  });

  return (
    <>
      <div class={"visualizador-parent"}>
        {scene.active && loadPercentage.value < 99 && (
          <SpinnerLoad loadValue={loadPercentage.value} />
        )}

        <div
          key={scene.name}
          id={`${scene.name}-visualizador`}
          draggable
          ref={draggableRef}
          class={[
            {
              hidden: loadPercentage.value < 99 || !scene.active,
            },
            "visualizador-child",
          ]}
        ></div>
      </div>
    </>
  );
});
