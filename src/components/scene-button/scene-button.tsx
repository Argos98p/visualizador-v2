import './scene-button-style.scss'
import { component$ } from '@builder.io/qwik';

interface Props {
    isActive:boolean,
    icon:string,
}

export const SceneButton = component$<Props>((props) => {
    return(
        <div class={`${(props.isActive ? 'btn-active' :'btn-no-active' )} scene-button rounded-md mt-1 text-white flex justify-center items-center`}>
            <img src={`../../../assets/${props.icon}.png`} alt='ol' width={27} height={27}/>
        </div>
    );
  
});