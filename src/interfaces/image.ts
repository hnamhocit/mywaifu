import { NekosImage } from "nekosapi/v3/types/nekosImage";

export interface IImage extends Omit<NekosImage, "tags"> {
  url: string;
  tags: string[];
}
