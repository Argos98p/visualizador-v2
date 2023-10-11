import axios from "axios";
import { getExtrasUrl, infoObjectUrl } from "~/Api/api-routes";
import { type ExtraInterface } from "~/Interfaces/interfaces";

const fetchData = async (url: string) => {
  const response = await axios.get(infoObjectUrl(url));
  return response.data;
};

const getExtras = async (id:string)=>{
  const response = await  axios.get(getExtrasUrl(id));
  return response.data as ExtraInterface[];
}

export { fetchData, getExtras };
