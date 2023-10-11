import { component$ } from "@builder.io/qwik";
import './spinner-load-style.scss'

interface ItemProps {
  loadValue: number;
}

export const SpinnerLoad = component$<ItemProps>((props) => {
  return (
    <div class="spinner-container">
      <div class="spinner-4"></div>
      <div class="text">{`${props.loadValue}%`}</div>
    </div>
  );
});
