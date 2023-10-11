import { component$, useStore, useTask$ } from "@builder.io/qwik";
import "./reel-extras-style.scss";
import { getExtras } from "~/service/motors-service";
import { type ExtraInterface } from "~/Interfaces/interfaces";
import { completeImageUrl } from "~/Api/api-routes";

interface Props {
  id: string;
}
export const ReelExtras = component$<Props>(({ id }) => {
  type imagesType = { images: string[] };

  const extras = useStore<imagesType>({ images: [] });

  useTask$(async () => {
    const temp: ExtraInterface[] = await getExtras(id);
    const aux = temp
      .filter((item) => item.imagen)
      .filter((item) => item.imagen?.path.includes(".jpg"))
      .map((item) => completeImageUrl(item.imagen!.path));

    extras.images = aux;

    console.log(aux);
  });

  return (
    <diV class="absolute bottom-0 z-50 h-1/4 w-full bg-red-700 overflow-x-hidden ">
      <div class=" scroll-container">
        {extras.images.map((item, index) => (
          <div key={index} class='reel_div-img-container flex-shrink-0'>
            
              <img src={item} alt="extra" class="" />
            </div>
        
        ))}
      </div>
    </diV>
  );
});
